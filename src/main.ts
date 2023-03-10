import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';
import 'dotenv/config';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc/api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
}
bootstrap();
