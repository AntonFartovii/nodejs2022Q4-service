import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { dirname, join } from "path";
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/httpException.filter';

const PORT = process.env.PORT ?? 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true
  });
  app.useGlobalPipes(new ValidationPipe());

  const logger = app.get( LoggerService )

  app.useLogger( logger );
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  process.on('unhandledRejection', (reason, promise) => {
    logger.warn(`Unhandled Rejection at: ${promise} reason: ${reason}`);
  });

  process.on('uncaughtException', (err) => {
    logger.error(`uncaughtException! Message: ${err.message}`);
    process.exit(1);
  });

  // const file = await readFile(join(dirname(__dirname), 'doc', 'api.yaml'), {
  //   encoding: 'utf-8',
  // });
  // const document = parse(file);
  //
  // SwaggerModule.setup('doc', app, document);

  await app.listen( PORT, () => {
    console.log(`Server running on PORT ${PORT}`);});
}
bootstrap();


