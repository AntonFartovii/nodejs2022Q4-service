import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { ServiceEntity } from '../entities/service.entity';

@Injectable()
export class UsersService extends ServiceEntity<User> {
  constructor(protected dbService: DBService<User>) {
    super(dbService);
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const entity: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    await this.dbService.create(entity);
    return returnUserWithoutPassword(entity);
  }

  async getOne(id: string): Promise<User> {
    return returnUserWithoutPassword(await this.dbService.findOne(id));
  }

  async getAll(): Promise<User[]> {
    const entities = await this.dbService.findMany()
    return entities.map( entity => returnUserWithoutPassword( entity ))
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const entity = await this.dbService.findOne(id);

    if (!oldPassword || !newPassword) {
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
    }

    if (oldPassword !== entity.password) {
      throw new HttpException('Password incorrect', HttpStatus.FORBIDDEN);
    }

    entity.password = newPassword;
    entity.version += 1;
    entity.updatedAt = new Date().getTime();
    await this.dbService.delete(id);

    return returnUserWithoutPassword(await this.dbService.patch(entity));
  }

  async delete(id: string): Promise<void> {
    await this.dbService.delete(id);
  }
}

function returnUserWithoutPassword(entity: User) {
  const newEntity = Object.entries(entity).filter(
    (field) => field[0] !== 'password',
  );
  return Object.fromEntries(newEntity) as User;
}
