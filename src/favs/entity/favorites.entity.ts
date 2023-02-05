import { Artist } from '../../interfaces/artist.interface';
import { Track } from '../../interfaces/track.interface';
import { Album } from '../../interfaces/album.interface';
import {
  Favorites,
  FavoritesRepsonse,
} from '../../interfaces/favorites.interface';

export class FavoritesEntity implements Favorites {
  artists: string[] = [];
  tracks: string[] = [];
  albums: string[] = [];
}

export class FavoritesEntityRes implements FavoritesRepsonse {
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
}
