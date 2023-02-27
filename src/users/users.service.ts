import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/responseUser.dto';

@Injectable()
export class UsersService  {

  constructor(
    @InjectRepository(UserEntity)
    private readonly dbService: Repository<UserEntity>
  ) {
  }

  async create( createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const entity = { ...createUserDto }

    const res = await this.dbService.create( entity )
    return (await this.dbService.save( res )).toResponse()

  }

  async findOne(id: string ): Promise<UserEntity> {
    const entity = await this.dbService.findOne({where:{id}})

    if (!entity) {
      throw new HttpException(
        'Entity does not exist',
        HttpStatus.NOT_FOUND)
    }
    return entity
  }

  async findOneWhere( login ): Promise<UserEntity> {
    const entity = await this.dbService.findOne({
      where: {
        login
      }
    } )

    if (!entity) {
      throw new HttpException(
        'Entity does not exist',
        HttpStatus.NOT_FOUND)
    }
    return entity
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.dbService.find()
  }

  async update( id: string, updatePasswordDto: UpdatePasswordDto ): Promise<ResponseUserDto> {
    const {oldPassword, newPassword} = updatePasswordDto
    const entity: UserEntity = await this.findOne( id ) as UserEntity

    if ( !oldPassword || !newPassword ) {
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST)
    }

    if ( oldPassword !== entity.password ) {
      throw new HttpException('Password incorrect', HttpStatus.FORBIDDEN)
    }

    const updatedEntity = new UserEntity({
      ...entity,
      password: newPassword,
    })

    return (await this.dbService.save( updatedEntity )).toResponse()
  }

  async delete( id: string ): Promise<void> {
    const res = await this.dbService.delete( id )
    if ( res.affected === 0) {
      throw new NotFoundException(`User id = ${id} not found`)
    }
  }

  async updateRefreshToken( id: string, newRefreshToken: string ) {
    const entity: UserEntity = await this.findOne( id ) as UserEntity


    const updatedEntity = new UserEntity({
      ...entity,
      refreshToken: newRefreshToken,
    })
    return (await this.dbService.save( updatedEntity )).toResponse()
  }
}
