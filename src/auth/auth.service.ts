import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import { Tokens } from '../interfaces/tokens.interfaces';

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
    const newUser = await this.userService.create({
      ...dto, password: hashPassport
    })
    const tokens = await this.getTokens(newUser.id, newUser.login);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { ...tokens, id: newUser.id };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.getHashData(refreshToken);
    await this.userService.updateRefreshToken( userId, hashedRefreshToken );
  }

  async login( dto: AuthDto ): Promise<Tokens> {
    const user = await this.userService.findOneWhere(
      dto.login
  )
    if (!user) throw new ForbiddenException(`Invalid login or password`)

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if ( !passwordMatches ) throw new ForbiddenException('incorrect login or password')

    const tokens = await this.getTokens( user.id, user.login )
    await this.userService.updateRefreshToken( user.id, tokens.refreshToken )
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens
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

  async getTokens( userId: string, login: string ) {
    const jwtPayload = {
      userId,
      login
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
