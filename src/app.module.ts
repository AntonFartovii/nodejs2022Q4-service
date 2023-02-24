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


@Module({
  imports: [
    UsersModule, ArtistsModule, TracksModule, AlbumsModule, FavsModule,
    TypeOrmModule.forRoot(
      {
        ...dataSourceOptions,
        autoLoadEntities: true,
      },
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
