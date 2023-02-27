import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoritesEntity } from '../../favs/entity/favorites.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';

@Entity('album')
export class AlbumEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({nullable: true})
  year: number | null

  @Column({nullable: true})
  artistId: string | null

  @ManyToOne((type) => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  artist;

  @ManyToOne(
    (type) => FavoritesEntity, (favorite) => favorite.albums,
    { onDelete: 'SET NULL', })
  favorite

  @OneToMany(
    (type) => TrackEntity, ( track ) => track.album,
    { onDelete: 'SET NULL' })
    tracks

}
