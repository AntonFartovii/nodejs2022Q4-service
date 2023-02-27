import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { Tokens } from '../interfaces/tokens.interfaces';
import { AuthRefreshTokenDto } from './dto/AuthRefreshToken.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {
  }

  @Public()
  @Post('signup')
  @HttpCode(200)
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup( dto )
  }

  @Public()
  @Post('login')
  @HttpCode(201)
  async login(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.login( dto )
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() dto: AuthRefreshTokenDto) {
    return await this.authService.refreshToken( dto.refreshToken )
  }
}
