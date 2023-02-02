import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Track } from '../interfaces/track.interface';
import { CreateArtistDto } from '../artists/dto/createArtist.dto';
import { Artist } from '../interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from '../artists/dto/updateArtist.dto';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DBService<Track>) {
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

  async getOne<T>(id: string) {
    return await this.dbService.findOne<T>( id )
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
  }
}
