import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Album } from '../interfaces/album.interface';
import { CreateTrackDto } from '../tracks/dto/createTrack.dto';
import { Track } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../tracks/dto/updateTrack.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly dbService: DBService<Album>) {
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

  async getAll<T>() {
    return await this.dbService.findMany<T>()
  }

  async getOne<T>(id: string) {
    return await this.dbService.findOne<T>( id )
  }

  async update<T>(id: string, dto: UpdateAlbumDto ) {
    const entity = await this.dbService.findOne<Album>( id )

    entity.name = dto.name ?? entity.name

    await this.dbService.delete( id )
    return await this.dbService.patch<T>( entity )
  }

  async delete<T>(id: string): Promise<void> {
    await this.dbService.delete<T>( id )
  }
}
