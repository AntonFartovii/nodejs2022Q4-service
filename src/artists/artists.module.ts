import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DBService } from '../db/db.service';
import { FavsModule } from '../favs/favs.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  imports: [
    forwardRef( () => FavsModule),
    forwardRef( () => TracksModule),
    AlbumsModule
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, DBService],
  exports: [ArtistsService]
})
export class ArtistsModule {}
