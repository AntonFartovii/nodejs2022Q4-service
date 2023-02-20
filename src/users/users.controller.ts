import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UseInterceptors,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { validateUUIDV4 } from '../utils';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './entities/user.entity';
import { ResponseUserDto } from './dto/responseUser.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes( new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    return await this.userService.create(dto)
  }

  @Get()
  async getAll():Promise<UserEntity[]> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<UserEntity> {
    validateUUIDV4( id )
    return await this.userService.findOne( id )
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes( new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: string, @Body() dto: UpdatePasswordDto
  ): Promise<ResponseUserDto> {
    validateUUIDV4( id )
    return await this.userService.update( id, dto )
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    validateUUIDV4( id )
    await this.userService.delete( id )
  }
}
