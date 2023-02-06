import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import {
  Favorites,
  FavoritesRepsonse,
} from '../interfaces/favorites.interface';
import { FavoritesEntityRes } from './entity/favorites.entity';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavsService {
  private db: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private entities: FavoritesRepsonse = new FavoritesEntityRes();

  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
  ) {}

  async getAll(): Promise<FavoritesRepsonse> {
    this.entities = {
      tracks: await this.tracksService.getAllByFilter(this.db.tracks),
      albums: await this.albumsService.getAllByFilter(this.db.albums),
      artists: await this.artistsService.getAllByFilter(this.db.artists),
    } as FavoritesRepsonse;

    return this.entities;
  }

  async addEntity(id: string, type: string) {
    const name = type + 's'
    const service = type + 'sService'
    await this.isExist(id, name, service);
    await this.isAdded(id, name);
    this.db[name].push(id);
    return this.db;
  }

  async deleteEntity(id: string, type: string): Promise<void> {
    const name = type + 's'
    const service = type + 'sService'
    await this[service].getOne(id);
    await this.deleteId(id, name);
  }

  async deleteId(id: string, name: string): Promise<void> {
    this.db[name] = this.db[name].filter((entityId) => entityId !== id);
  }

  async isAdded(id: string, name: string): Promise<void> {
    const res = this.db[name].find((entityId) => entityId === id);
    if (res) {
      throw new HttpException(
        `Entity ID = ${id} is already added to favorites`,
        400,
      );
    }
  }

  async isExist(id: string, name: string, service: string): Promise<void> {
    try {
      await this[service].getOne(id);
    } catch (e) {
      throw new HttpException(
        `Entity ID = ${id} in ${name} does not exist`,
        422,
      );
    }
  }
}
