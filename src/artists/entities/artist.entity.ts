import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FavoritesEntity } from '../../favs/entity/favorites.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';


@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  grammy: boolean

  @ManyToOne((type) => FavoritesEntity, (favorite) => favorite.artists,
    { onDelete: 'SET NULL', })
  favorite

  // Artist has many tracks
  @ManyToOne((type) => TrackEntity, ( track ) => track.artist, {
    onDelete: 'SET NULL',
  })
  tracks;
}
