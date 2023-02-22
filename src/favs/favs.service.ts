import { forwardRef, HttpException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { Favorites, FavoritesRepsonse } from '../interfaces/favorites.interface';
import { FavoritesEntity, FavoritesEntityRes } from './entity/favorites.entity';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class FavsService {

  private entities: FavoritesRepsonse = new FavoritesEntityRes()

  constructor(
    @InjectRepository(FavoritesEntity)
    private db: Repository<FavoritesEntity>,
    @Inject(forwardRef( () => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef( () => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef( () => ArtistsService))
    private artistsService: ArtistsService) {
  }

  id = 'myid'

  async getAll(): Promise<FavoritesEntityRes> {
    const [res] = await this.findOneFav()

    return {
      tracks: res.tracks || [],
      albums: res.albums|| [],
      artists: res.artists || []
    } as FavoritesRepsonse
  }

  async addEntity( id: string, name: string, service: string ) {
      await this.isExist( id, name, service )
      const fav = await this.findOneFav()

      const entity = await this[service].findOne( id )

      fav[name] = [...fav[name], entity];
      return await this.db.save( fav )
  }

  async deleteEntity( id: string, name: string, service?: string ): Promise<void> {
    const favorite = await this.findOneFav();

    const entity = favorite[name].find( (entity) => entity.id === id);
    if (!entity) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }

    favorite[name] = favorite[name].filter((entity) => entity.id !== id);
    await this.db.save(favorite);
  }

  async isExist( id: string, name: string, service: string ): Promise<void> {
    try {
      await this[service].findOne( id )
    } catch (e) {
      throw new HttpException(
        `Entity ID = ${id} in ${name} does not exist`, 422)
    }
  }

  async findOneFav() {
    return await this.db.find(
      {
        relations:{
          albums: true,
          artists: true,
          tracks: true
        }
      })
  }
}
