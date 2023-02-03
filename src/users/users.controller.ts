import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { validateUUIDV4 } from '../utils';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @UsePipes( new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto)
  }

  @Get()
  async getAll():Promise<User[]> {
    return await this.userService.getAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    validateUUIDV4( id )
    return await this.userService.getOne( id )
  }

  @UsePipes( new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: string, @Body() dto: UpdatePasswordDto
  ): Promise<User> {
    validateUUIDV4( id )
    return this.userService.update( id, dto )
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    validateUUIDV4( id )
    await this.userService.delete( id )
  }
}
