import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBService } from '../db/db.service';

@Module({
  providers: [TracksService, DBService],
  controllers: [TracksController]
})
export class TracksModule {}
