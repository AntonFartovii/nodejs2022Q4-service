import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FavoritesEntity } from '../../favs/entity/favorites.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';

@Entity('track')
export class TrackEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  @ManyToOne(
    (type) => FavoritesEntity,(favorite) => favorite.tracks,
    {onDelete: 'SET NULL',})
  favorite: string;

  // Track has one artist, but artist has many tracks
  @ManyToOne((type) => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist;

  // Track has one albums, but album has many tracks
  @ManyToOne((type) => AlbumEntity, ( album ) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album;
}
