import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsService } from './albums/albums.service';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule],
  controllers: [AppController, UsersController, TracksController],
  providers: [AppService, UsersService, AlbumsService],
})
export class AppModule {}
