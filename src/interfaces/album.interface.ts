export interface Album {
  id: string; // uuid v4
  name: string | null;
  year: number | null;
  artistId: string | null; // refers to Artist
}
