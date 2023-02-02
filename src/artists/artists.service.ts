import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DBService<Artist>) {
  }

  async create({name, grammy}: CreateArtistDto){
    const entity: Artist = {
      id: uuidv4(),
      name,
      grammy
    }
    return await this.dbService.create<Artist>( entity )
  }

  async getAll<T>() {
    return await this.dbService.findMany<T>()
  }

  async getOne<T>(id: string) {
    return await this.dbService.findOne<T>( id )
  }

  async update<T>(id: string, {name, grammy}: UpdateArtistDto ) {
    const entity = await this.dbService.findOne<Artist>( id )

    entity.name = name ?? entity.name
    entity.grammy = grammy ?? entity.grammy

    await this.dbService.delete( id )

    return await this.dbService.patch<T>( entity )
  }

  async delete<T>(id: string): Promise<void> {
    await this.dbService.delete<T>( id )
  }
}
