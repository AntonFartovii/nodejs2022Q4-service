import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DBService } from '../db/db.service';

@Module({
  providers: [ArtistsService, DBService],
  controllers: [ArtistsController]
})
export class ArtistsModule {}
