import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { Artist } from '../interfaces/artist.interface';
import { Album } from '../interfaces/album.interface';
import { Track } from '../interfaces/track.interface';
import { Favorites } from '../interfaces/favorites.interface';


@Injectable()
export class DBService {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
