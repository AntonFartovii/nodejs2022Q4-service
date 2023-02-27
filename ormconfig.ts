import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './src/users/entities/user.entity';
import { AlbumEntity } from './src/albums/entities/album.entity';
import { ArtistEntity } from './src/artists/entities/artist.entity';
import { TrackEntity } from './src/tracks/entities/track.entity';
import { FavoritesEntity } from './src/favs/entity/favorites.entity';


export const dataSourceOptions: DataSourceOptions  = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST as string,
  port: +process.env.TYPEORM_PORT as number,
  username: process.env.TYPEORM_USERNAME as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  entities: [UserEntity, AlbumEntity, ArtistEntity, TrackEntity, FavoritesEntity],
  migrations: ['./dist/src/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
  logging: false
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
