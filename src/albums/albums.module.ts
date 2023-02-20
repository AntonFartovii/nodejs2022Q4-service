import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavsModule } from '../favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [
    forwardRef( () => FavsModule),
    TypeOrmModule.forFeature([AlbumEntity])
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService]
})
export class AlbumsModule {}
