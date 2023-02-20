import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { FavsService } from '../favs/favs.service';
import { ArtistsService } from '../artists/artists.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly dbService: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService
  ) {
  }

  async create( dto: CreateTrackDto ){
    const entity: Track = {
      id: uuidv4(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId,
      albumId: dto.albumId
    }
    const res = await this.dbService.create( entity )
    return await this.dbService.save( res )
  }

  async findOne( id: string ): Promise<TrackEntity> {
    const entity = await this.dbService.findOne({where:{id}})

    if (!entity) {
      throw new HttpException(
        'Entity does not exist',
        HttpStatus.NOT_FOUND)
    }
    return entity
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.dbService.find()
  }

  async update(id: string, dto: UpdateTrackDto ) {
    const entity = await this.findOne( id )

    entity.name = dto.name ?? entity.name
    entity.duration = dto.duration ?? entity.duration
    entity.artistId = dto.artistId ?? entity.artistId
    entity.albumId = dto.albumId ?? entity.albumId

    return await this.dbService.save( entity )
  }

  async delete(id: string): Promise<void> {
    const res = await this.dbService.delete( id )

    if ( res.affected === 0) {
      throw new NotFoundException(`User id = ${id} not found`)
    }
  }

}
