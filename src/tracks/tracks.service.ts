import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Track } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { FavsService } from '../favs/favs.service';
import { ArtistsService } from '../artists/artists.service';
import { Album } from '../interfaces/album.interface';
import { ServiceEntity } from '../entities/service.entity';

@Injectable()
export class TracksService extends ServiceEntity<Track>{
  constructor(

    protected dbService: DBService<Track>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService
  ) {
    super(dbService)
  }

  async create( dto: CreateTrackDto ){
    const entity: Track = {
      id: uuidv4(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId,
      albumId: dto.albumId
    }
    return await this.dbService.create( entity )
  }

  async update(id: string, dto: UpdateTrackDto ) {
    const entity = await this.dbService.findOne( id )

    entity.name = dto.name ?? entity.name
    entity.duration = dto.duration ?? entity.duration
    entity.artistId = dto.artistId ?? entity.artistId
    entity.albumId = dto.albumId ?? entity.albumId

    await this.dbService.delete( id )
    return await this.dbService.patch( entity )
  }

  async delete(id: string): Promise<void> {
    await this.dbService.delete( id )
    await this.favsService.deleteId( id, 'tracks')
  }




}
