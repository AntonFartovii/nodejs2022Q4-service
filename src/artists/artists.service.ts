import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { FavsService } from '../favs/favs.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { Track } from '../interfaces/track.interface';
import { Album } from '../interfaces/album.interface';
import { ServiceEntity } from '../entities/service.entity';

@Injectable()
export class ArtistsService extends ServiceEntity<Artist>{
  constructor(
    protected dbService: DBService<Artist>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {
    super(dbService)
  }

  async create({name, grammy}: CreateArtistDto){
    const entity: Artist = {
      id: uuidv4(),
      name,
      grammy
    }
    return await this.dbService.create<Artist>( entity )
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
    await this.tracksService.deleteRelationsIn<Track>('artistId', id)
    await this.albumsService.deleteRelationsIn<Album>( 'artistId', id)
    await this.favsService.deleteId( id, 'artists')
  }

}
