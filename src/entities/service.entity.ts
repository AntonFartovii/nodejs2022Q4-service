import { DBService } from '../db/db.service';

export class ServiceEntity<T extends { id: string }> {
  constructor(protected dbService: DBService<T>) {}

  async getAll(): Promise<T[]> {
    return await this.dbService.findMany();
  }

  async getOne(id: string): Promise<T> {
    return await this.dbService.findOne(id);
  }

  async getAllByFilter(ids: string[]): Promise<T[]> {
    return await this.dbService.findManyByIds(ids);
  }

  async deleteRelationsIn(relation: string, relationId: string): Promise<void> {
    const entities = await this.getAll();

    for (const key in entities) {
      const entity = entities[key];

      if (entity[relation] === relationId) {
        entity[relation] = null;
        await this.dbService.patch(entity);
      }
    }
  }
}
