import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import 'dotenv/config';

const PORT = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen( PORT, () => {
    console.log(`Server running on PORT ${PORT}`);});
}
bootstrap();
