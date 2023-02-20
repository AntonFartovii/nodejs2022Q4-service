import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { FavsService } from '../favs/favs.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { Track } from '../interfaces/track.interface';
import { Album } from '../interfaces/album.interface';
import { ServiceEntity } from '../entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { In, Repository } from 'typeorm';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    protected dbService: Repository<ArtistEntity>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {
  }

  async create({name, grammy}: CreateArtistDto){
    const entity: Artist = {
      id: uuidv4(),
      name,
      grammy
    }
    const res = await this.dbService.create( entity )
    return await this.dbService.save( res )
  }

  async findOne( id: string ): Promise<ArtistEntity> {
    const entity = await this.dbService.findOne({where:{id}})

    if (!entity) {
      throw new HttpException(
        'Entity does not exist',
        HttpStatus.NOT_FOUND)
    }
    return entity
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.dbService.find()
  }

  async update(id: string, {name, grammy}: UpdateArtistDto ) {
    const entity = await this.findOne( id )

    entity.name = name ?? entity.name
    entity.grammy = grammy ?? entity.grammy

    return await this.dbService.save( entity )
  }

  async delete(id: string): Promise<void> {
    const res = await this.dbService.delete( id )
    if ( res.affected === 0) {
      throw new NotFoundException(`User id = ${id} not found`)
    }
  }
}
