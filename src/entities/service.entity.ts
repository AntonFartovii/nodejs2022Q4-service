import { DBService } from '../db/db.service';
import { Track } from '../interfaces/track.interface';

export class ServiceEntity<T extends {id: string}> {

  constructor(
    protected dbService: DBService<T>
  ) {
  }

  async getAll<T>() {
    return await this.dbService.findMany<T>()
  }

  async getOne(id: string) {
    return await this.dbService.findOne<T>( id )
  }

  async getAllByFilter( ids: string[] ): Promise<T[]> {
    return await this.dbService.findManyByIds<T>( ids )
  }

  async deleteRelationsIn<T>( relation: string, relationId: string ) {
    const entities = await this.getAll<T>()

    for( let key in entities ) {
      const entity = entities[key]

      if ( entity[relation] === relationId ) {
        entity[relation] = null
        await this.dbService.patch<T>( entity )
      }
    }
  }


}
