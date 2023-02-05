import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { FavsService } from '../favs/favs.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ServiceEntity } from '../entities/service.entity';

@Injectable()
export class ArtistsService extends ServiceEntity<Artist> {
  constructor(
    protected dbService: DBService<Artist>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {
    super(dbService);
  }

  async create({ name, grammy }: CreateArtistDto) {
    const entity: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    return await this.dbService.create(entity);
  }

  async update(id: string, { name, grammy }: UpdateArtistDto) {
    const entity = await this.dbService.findOne(id);

    entity.name = name ?? entity.name;
    entity.grammy = grammy ?? entity.grammy;

    await this.dbService.delete(id);

    return await this.dbService.patch(entity);
  }

  async delete(id: string): Promise<void> {
    await this.dbService.delete(id);
    await this.tracksService.deleteRelationsIn('artistId', id);
    await this.albumsService.deleteRelationsIn('artistId', id);
    await this.favsService.deleteId(id, 'artists');
  }
}
