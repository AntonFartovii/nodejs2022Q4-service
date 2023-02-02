import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import {v4 as uuidv4} from 'uuid'
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DBService<User>) {
  }

  async create({login, password}: CreateUserDto): Promise<User> {
    const entity: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }

    await this.dbService.create( entity )
    return returnUserWithoutPassword( entity )
  }

  async getAll<T>() {
    return await this.dbService.findMany<T>()
  }

  async getOne<T>(id: string) {
    return await this.dbService.findOne<T>( id )
  }

  async update<T>(id: string, {oldPassword, newPassword}: UpdateUserDto ) {

    const entity = await this.dbService.findOne<T>( id )

    if ( !oldPassword || !newPassword ) {
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST)
    }

    if ( oldPassword !== entity.password ) {
      throw new HttpException('Password incorrect', HttpStatus.FORBIDDEN)
    }

    entity.password = newPassword
    entity.version += 1
    entity.updatedAt = new Date().getTime()
    await this.dbService.delete( id )

    return returnUserWithoutPassword(
      await this.dbService.patch<T>( entity )
    )
  }

  async delete<T>(id: string): Promise<void> {
    await this.dbService.delete<T>( id )
  }
}

function returnUserWithoutPassword( entity: User ) {
  const newEntity = Object.entries( entity ).filter( field => field[0] !== 'password')
  return Object.fromEntries( newEntity ) as User;
}
