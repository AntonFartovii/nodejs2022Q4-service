import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';


export default {
  type: process.env.TYPEORM_CONNECTION as string,
  host: process.env.TYPEORM_HOST as string,
  port: +process.env.TYPEORM_PORT as number,
  username: process.env.TYPEORM_USERNAME as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  entities: ['dist/src/**/*entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: true, // Indicates if migrations should be auto run on every application launch
  synchronize: true,
  autoLoadEntities: true,
} as DataSourceOptions;
