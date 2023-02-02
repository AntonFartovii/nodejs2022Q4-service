import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DBService } from '../db/db.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DBService]
})
export class FavsModule {}
