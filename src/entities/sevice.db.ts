// import { HttpException, HttpStatus } from '@nestjs/common';
// import { DataSource, EntityTarget, Repository } from 'typeorm';
//
// export class ServiceDb<T> {
//   private repository: Repository<T>;
//
//   constructor(dataSource: DataSource, repo: EntityTarget<T>) {
//     this.repository = dataSource.getRepository<T>(repo);
//   }
//
//   async findOne( id: string ): Promise<T> {
//     const entity = await this.repository.findOne({where:{id}})
//
//     if (!entity) {
//       throw new HttpException(
//         'Entity does not exist',
//         HttpStatus.NOT_FOUND)
//     }
//     return entity
//   }
//
// }
