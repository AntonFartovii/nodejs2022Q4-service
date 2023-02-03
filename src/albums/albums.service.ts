import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Album } from '../interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { FavsService } from '../favs/favs.service';
import { TracksService } from '../tracks/tracks.service';
import { Track } from '../interfaces/track.interface';
import { ServiceEntity } from '../entities/service.entity';

@Injectable()
export class AlbumsService extends ServiceEntity<Album> {
  constructor(
    protected dbService: DBService<Album>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    private tracksService: TracksService) {
    super(dbService)
  }

  async create( dto: CreateAlbumDto ){
    const entity: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId
    }
    return await this.dbService.create<Album>( entity )
  }

  async update<T>(id: string, dto: UpdateAlbumDto ) {
    const entity = await this.dbService.findOne<Album>( id )

    entity.name = dto.name ?? entity.name
    entity.year = dto.year ?? entity.year
    entity.artistId = dto.artistId ?? entity.artistId

    await this.dbService.delete( id )
    return await this.dbService.patch<T>( entity )
  }

  async delete<T>(id: string): Promise<void> {
    await this.dbService.delete<T>( id )
    await this.tracksService.deleteRelationsIn('albumId', id)
    await this.favsService.deleteId( id, 'albums')
  }





}
