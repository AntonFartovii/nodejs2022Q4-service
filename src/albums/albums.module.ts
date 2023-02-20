import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { DBService } from '../db/db.service';
import { FavsModule } from '../favs/favs.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [forwardRef(() => FavsModule), forwardRef(() => TracksModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService, DBService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
