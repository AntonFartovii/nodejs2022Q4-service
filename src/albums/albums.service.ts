import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { FavsService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { In, Repository } from 'typeorm';
import { ArtistsService } from '../artists/artists.service';
import { ArtistEntity } from '../artists/entities/artist.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    protected dbService: Repository<AlbumEntity>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,

    ) {
  }

  async create( dto: CreateAlbumDto ){
    if ( dto.artistId ) {
      const artist: ArtistEntity = await this.artistService.findOne( dto.artistId );

      if (!artist) {
        throw new NotFoundException(`There is no artist with id: ${dto.artistId}`);
      }
    }
    const entity: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null
    }
    const res = await this.dbService.create( entity )
    return await this.dbService.save( res )
  }

  async findOne( id: string ): Promise<AlbumEntity> {
    const entity = await this.dbService.findOne({where:{id}})

    if (!entity) {
      throw new HttpException(
        'Entity does not exist',
        HttpStatus.NOT_FOUND)
    }
    return entity
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.dbService.find()
  }

  async update( id: string, dto: UpdateAlbumDto ) {
    const entity = await this.findOne( id )

    entity.name = dto.name ?? entity.name
    entity.year = dto.year ?? entity.year
    entity.artistId = dto.artistId ?? entity.artistId

    return await this.dbService.save( entity )
  }

  async delete( id: string ): Promise<void> {
    const res = await this.dbService.delete( id )
    if ( res.affected === 0) {
      throw new NotFoundException(`User id = ${id} not found`)
    }
  }

}

