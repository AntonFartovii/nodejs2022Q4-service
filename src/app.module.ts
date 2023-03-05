import { AlbumsModule } from './albums/albums.module';
import { FavsModule } from './favs/favs.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { dataSourceOptions } from '../ormconfig';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';


@Module({
  imports: [
    LoggerModule,
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavsModule,
    AuthModule,
    TypeOrmModule.forRoot(
      {
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env.example',
    }),

  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
  ],
})
export class AppModule {}
