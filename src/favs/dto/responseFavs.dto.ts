import { UserEntity } from '../../users/entities/user.entity';
import { FavoritesEntity } from '../entity/favorites.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';


export class ResponseFavsDto {

  artists: ArtistEntity[]
  tracks: TrackEntity[]
  albums: AlbumEntity[];

  constructor(partial: Partial<FavoritesEntity>) {
    Object.assign(this, partial);
  }
}
