import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { ResponseUserDto } from '../users/dto/responseUser.dto';
import { Tokens } from '../interfaces/tokens.interfaces';

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
  async login(@Body() dto: AuthDto): Promise<ResponseUserDto & Tokens> {
    return await this.authService.login( dto )
  }

  @Post('refresh')
  async refresh() {

  }


}
