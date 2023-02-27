import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import { ResponseUserDto } from '../users/dto/responseUser.dto';
import { Tokens } from '../interfaces/tokens.interfaces';
import { AuthPlayload } from './dto/AuthPlayload';

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
    return await this.userService.create({
      ...dto, password: hashPassport
    })
    // return 'User created'
  }

  async login( dto: AuthDto ): Promise<Tokens> {
    const user = await this.userService.findOneWhere(
      dto.login
  )

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if ( !passwordMatches ) throw new ForbiddenException('wrong pass')

    const tokens = await this.getTokens( user.id, user.login )
    await this.userService.updateRefreshToken( user.id, tokens.refreshToken )
    return {
      ...tokens
    }
  }

  async refreshToken( refreshToken: string ) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        })

      const user = await this.userService.findOne( payload.userId )

      if ( !user ) throw new ForbiddenException();

      if ( user.refreshToken !== refreshToken ) throw new ForbiddenException();

      const tokens = await this.getTokens( user.id, user.login )
      await this.userService.updateRefreshToken( user.id, tokens.refreshToken )

      return tokens
    } catch {
      throw new ForbiddenException()
    }
  }

  async getHashData( data: string ): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  async getTokens( userId: string, userLogin: string ) {
    const jwtPayload = {
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
}
