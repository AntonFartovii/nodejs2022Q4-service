import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  @IsString()
  id: string;

  @IsString()
  login: string;

  @IsString()
  @Exclude()
  password: string;

  @IsNumber()
  version: number;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
