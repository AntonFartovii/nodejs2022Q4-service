import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './users/entities/user.entity';
import { TrackEntity } from './tracks/entities/track.entity';
import { AlbumEntity } from './albums/entities/album.entity';
import { ArtistEntity } from './artists/entities/artist.entity';
import { FavoritesEntity } from './favs/entity/favorites.entity';


export default {
  type: process.env.TYPEORM_CONNECTION as string,
  host: process.env.TYPEORM_HOST as string,
  port: +process.env.TYPEORM_PORT as number,
  username: process.env.TYPEORM_USERNAME as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  // entities: [
  //   UserEntity, TrackEntity, AlbumEntity, ArtistEntity, FavoritesEntity
  // ],
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: false, // Indicates if migrations should be auto run on every application launch
  synchronize: true,
  autoLoadEntities: true,
  // cli: {
  //   entitiesDir: 'src/**/*.entity{.ts,.js}',
  //   migrationsDir: 'src/migrations/*{.ts,.js}',
  // },
} as DataSourceOptions;
