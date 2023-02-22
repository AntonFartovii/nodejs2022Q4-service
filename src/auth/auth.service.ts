import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
  private readonly userService: UsersService
  ) {
  }

  async signup( dto: CreateUserDto ) {
    const user = await this.userService.create( dto )
  }
}
