import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavsModule } from '../favs/favs.module';
import { ArtistsModule } from '../artists/artists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';

@Module({
  imports: [
    forwardRef(() => FavsModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([TrackEntity])
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService]

})
export class TracksModule {}
