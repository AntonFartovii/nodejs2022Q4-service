import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { Favorites, FavoritesRepsonse } from '../interfaces/favorites.interface';
import { FavoritesEntityRes } from './entity/favorites.entity';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';


@Injectable()
export class FavsService {

  private db: Favorites = {
    artists: [],
    albums: [],
    tracks: []
  }

  private entities: FavoritesRepsonse = new FavoritesEntityRes()

  constructor(
    @Inject(forwardRef( () => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef( () => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef( () => ArtistsService))
    private artistsService: ArtistsService) {
  }

  async getAll(): Promise<FavoritesRepsonse> {

    const tracks = await this.tracksService.getAllByFilter( this.db.tracks )
    const albums = await this.albumsService.getAllByFilter( this.db.albums)
    const artists = await this.artistsService.getAllByFilter( this.db.artists )
    return {
      tracks,
      albums,
      artists
    } as FavoritesRepsonse
  }

  async addEntity( id: string, name: string, service: string ) {
    try {
      await this[service].getOne( id )
      this.db[name].push( id )
      return this.db
    } catch (e) {
      throw new HttpException('422', 422)
    }

  }

  async deleteEntity( id: string, name: string, service: string ) {
    await this[service].getOne( id )
    await this.deleteId( id, name )
  }

  async deleteId( id: string,  name: string, ) {
    this.db[name] = this.db[name].filter( entityId => entityId !== id )
  }
}
