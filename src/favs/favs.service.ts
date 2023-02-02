import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Favorites, FavoritesDB, FavoritesRepsonse } from '../interfaces/favorites.interface';

@Injectable()
export class FavsService {
  constructor(private readonly dbService: DBService<FavoritesDB>) {
  }

  async getAll(): Promise<FavoritesRepsonse> {
    return await this.dbService.findFavs()
  }

  async addEntity( id: string, name: string  ) {
    const entity: FavoritesDB = await this.dbService.getOneFavs<FavoritesDB>()
    entity.tracks.push( id )
    return await this.dbService.saveOneFavs<FavoritesDB>( entity )
  }
}
