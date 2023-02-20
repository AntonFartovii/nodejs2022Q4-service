import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DBService } from '../db/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers:[UsersService],
  imports:[TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule {}
