import { Artist } from '../../interfaces/artist.interface';
import { Track } from '../../interfaces/track.interface';
import { Album } from '../../interfaces/album.interface';
import { Favorites, FavoritesRepsonse } from '../../interfaces/favorites.interface';
import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { ResponseUserDto } from '../../users/dto/responseUser.dto';
import { ResponseFavsDto } from '../dto/responseFavs.dto';

@Entity('favs')
export class FavoritesEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(
    (type) => ArtistEntity,
    (artist) => artist.favorite
  )
  @JoinColumn({ name: 'artists' })
  artists: ArtistEntity[]; // favorite artists ids

  @OneToMany(
    (type) => AlbumEntity,
    (album) => album.favorite
  )
  @JoinColumn({ name: 'albums' })
  albums: AlbumEntity[]; // favorite albums ids

  @OneToMany((type) => TrackEntity, (track) => track.favorite
  )
  @JoinColumn({ name: 'tracks' })
  tracks: TrackEntity[]; // favorite tracks ids

  toResponse(): ResponseFavsDto {
    return new ResponseFavsDto(this);
  }
}

export class FavoritesEntityRes implements FavoritesRepsonse {
  artists: ArtistEntity[] = []
  tracks: TrackEntity[] = []
  albums: AlbumEntity[] = []
}
