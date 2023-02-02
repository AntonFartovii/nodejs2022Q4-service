import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Favorites, FavoritesDB, FavoritesRepsonse } from '../interfaces/favorites.interface';

interface State<T extends {id: string}, K extends keyof Favorites> {

}

@Injectable()


export class DBService<T extends {id: string}> {

  private list: T[] = []

  async getOneFavs<T>() {
    if ( this.list.length === 0 ) await this.init()
    return await this.findOne<T>('1')
  }

  async saveOneFavs<T>( entity: T) {
    await this.delete<T>('1')
    await this.patch<T>( entity )
    return await this.getOneFavs()
  }

  async addIdToFavs<T>( id: string, name: string ) {
    // проверить что существует
    // если не существует то создать
    // если существует то получить

    if ( this.list.length === 0 ) await this.init()
    const entity = await this.findOne<FavoritesDB>('1')
    await this.patch<FavoritesDB>( entity )
    console.log( entity);

  }

  async init() {
    const favs: FavoritesDB = {id: '1', albums: [], artists: [], tracks: []}
    await this.addToFavs<FavoritesDB>( favs )
  }

  async findFavs(): Promise<FavoritesRepsonse> {
    if ( this.list.length === 0 ) await this.init()

    console.log( this.list[0]);

    return {
      artists: [],
      albums: [],
      tracks: []
    } as FavoritesRepsonse
  }

  async addToFavs<T>( entity ) {
    this.list.push( entity )
  }

  async create<T>( entity ) {
    this.list.push( entity )
    return entity
  }

  async findMany<T>() {
    return this.list
  }

  async findOne<T>(id: string) {
    const entity = this.list.find( entity => entity.id === id)

    if (!entity) {
      throw new HttpException(
        'Entity does not exist',
        HttpStatus.NOT_FOUND)
    }
    return entity
  }

  async patch<T>( entity ) {
    this.list.push( entity )
    return entity
  }

  async delete<T>(id: string) {
    await this.findOne<T>( id )
    this.list = this.list.filter( entity => entity.id !== id )
  }
}
