import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { FavsService } from '../favs/favs.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly dbService: DBService<Artist>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService
  ) {
  }

  async create({name, grammy}: CreateArtistDto){
    const entity: Artist = {
      id: uuidv4(),
      name,
      grammy
    }
    return await this.dbService.create<Artist>( entity )
  }

  async getAll<T>() {
    return await this.dbService.findMany<T>()
  }

  async getOne<T>(id: string) {
    return await this.dbService.findOne<T>( id )
  }

  async update<T>(id: string, {name, grammy}: UpdateArtistDto ) {
    const entity = await this.dbService.findOne<Artist>( id )

    entity.name = name ?? entity.name
    entity.grammy = grammy ?? entity.grammy

    await this.dbService.delete( id )

    return await this.dbService.patch<T>( entity )
  }

  async delete<T>(id: string): Promise<void> {
    await this.dbService.delete<T>( id )
    await this.tracksService.deleteArtistInTracks( id )
    await this.favsService.deleteId( id, 'artists')
  }

  async getAllByFilter( ids: string[] ): Promise<Artist[]> {
    return await this.dbService.findManyByIds<Artist>( ids )
  }
}
