import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DBService<T extends { id: string }> {
  private list: T[] = [];

  async create(entity) {
    this.list.push(entity);
    return entity;
  }

  async findMany() {
    return this.list;
  }

  async findOne(id: string) {
    const entity = this.list.find((entity) => entity.id === id);

    if (!entity) {
      throw new HttpException('Entity does not exist', HttpStatus.NOT_FOUND);
    }
    return entity;
  }

  async patch(entity) {
    this.list.push(entity);
    return entity;
  }

  async delete(id: string) {
    await this.findOne(id);
    this.list = this.list.filter((entity) => entity.id !== id);
  }

  async findManyByIds(ids: string[]) {
    const entities = [];

    ids.forEach((id) => {
      const entity = this.list.find((entity) => entity.id === id);
      entities.push(entity);
    });

    return entities;
  }
}
