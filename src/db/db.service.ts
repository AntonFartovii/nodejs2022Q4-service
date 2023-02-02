import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


@Injectable()
export class DBService<T extends { id: string }> {

  private list: T[] = []

  async create<T>( entity ) {
    this.list.push( entity )
    return entity
  }

  async findMany<T>() {
    return this.list
  }

  async findOne<T>( id: string ) {
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

  async findManyByIds<T>( ids: string[] ) {
    let entities = []

    ids.forEach( id => {
      const entity = this.list.find( entity => entity.id === id )
      entities.push( entity )
    })

    return entities
  }

}
