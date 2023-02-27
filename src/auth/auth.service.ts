import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
  @Inject(forwardRef(() => UsersService))
  private userService: UsersService,
  private jwtService: JwtService
  ) {
  }

  async signup( dto: CreateUserDto ) {
    const hashPassport = await this.getHashData( dto.password );
    const user = await this.userService.create({
      ...dto, password: hashPassport
    })

    const tokens = await this.getTokens( user.id, user.login );
  }

  async getHashData(data: string ): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  async getTokens( userId, userLogin ) {
    const jwtPayload: JwtPayload = {
      userId,
      userLogin
    };

    const accessToken = await this.jwtService.sign(
      jwtPayload,
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '10m'
      }
    )

    const refreshToken = await this.jwtService.sign(
      jwtPayload,
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: '1d'
      }
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async updateRefreshToken( userId: string, refreshToken: string ) {

    const newRefreshToken = await this.getHashData( refreshToken )
    return await this.userService.updateRefreshToken( userId, newRefreshToken )
  }
}
