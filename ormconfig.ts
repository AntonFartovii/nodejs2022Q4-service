import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './src/users/entities/user.entity';
import { AlbumEntity } from './src/albums/entities/album.entity';
import { ArtistEntity } from './src/artists/entities/artist.entity';
import { TrackEntity } from './src/tracks/entities/track.entity';
import { FavoritesEntity } from './src/favs/entity/favorites.entity';

export default {
  type: process.env.TYPEORM_CONNECTION as string,
  host: 'localhost',
  port: +process.env.TYPEORM_PORT as number,
  username: process.env.TYPEORM_USERNAME as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  entities: [UserEntity, AlbumEntity, ArtistEntity, TrackEntity, FavoritesEntity],
  migrations: ['/dist/src/migrations/*.js'],
  autoLoadEntities: true,
  migrationsRun: true, // Indicates if migrations should be auto run on every application launch
  synchronize: false,
  logging: true,

} as DataSourceOptions;
