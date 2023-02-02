import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DBService } from '../db/db.service';
import { FavsModule } from '../favs/favs.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [
    forwardRef(() => FavsModule),
    forwardRef(() => ArtistsModule)
  ],
  controllers: [TracksController],
  providers: [TracksService, DBService],
  exports: [TracksService]

})
export class TracksModule {}
