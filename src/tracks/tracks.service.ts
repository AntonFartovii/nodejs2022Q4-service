import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Track } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { FavsService } from '../favs/favs.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly dbService: DBService<Track>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService
  ) {
  }

  async create( dto: CreateTrackDto ){
    const entity: Track = {
      id: uuidv4(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId,
      albumId: dto.albumId
    }
    return await this.dbService.create<Track>( entity )
  }

  async getAll<T>() {
    return await this.dbService.findMany<T>()
  }

  async getOne(id: string) {
    return await this.dbService.findOne<Track>( id )
  }

  async update<T>(id: string, dto: UpdateTrackDto ) {
    const entity = await this.dbService.findOne<T>( id )

    entity.name = dto.name ?? entity.name
    entity.duration = dto.duration ?? entity.duration
    entity.artistId = dto.artistId ?? entity.artistId
    entity.albumId = dto.albumId ?? entity.albumId

    await this.dbService.delete( id )
    return await this.dbService.patch<T>( entity )
  }

  async delete<T>(id: string): Promise<void> {
    await this.dbService.delete<T>( id )
    await this.favsService.deleteId( id, 'tracks')
  }

  async getAllByFilter( ids: string[] ): Promise<Track[]> {
    return await this.dbService.findManyByIds<Track>( ids )
  }

  async deleteArtistInTracks( artistId: string ) {
    const entities: Track[] = await this.getAll<Track>()

    for( let key in entities ) {
      const entity = entities[key]

      if ( entity.artistId === artistId ) {
        entity.artistId = null
        await this.dbService.patch<Track>( entity )
      }
    }
  }

  async deleteAlbumInTracks( albumId: string ) {
    const entities: Track[] = await this.getAll<Track>()

    for( let key in entities ) {
      const entity = entities[key]

      if ( entity.albumId === albumId ) {
        entity.albumId= null
        await this.dbService.patch<Track>( entity )
      }
    }
  }
}
