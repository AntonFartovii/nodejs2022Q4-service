import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef( () => UsersModule),
    JwtModule.register({ secret: process.env.JWT_SECRET_REFRESH_KEY })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]

})
export class AuthModule {}
