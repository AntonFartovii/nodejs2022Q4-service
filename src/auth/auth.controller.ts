import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup( dto )
  }

  @Post('login')
  async login() {

  }

  @Post('refresh')
  async refresh() {

  }


}
