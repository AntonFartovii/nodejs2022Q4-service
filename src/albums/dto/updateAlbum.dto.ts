import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  artistId: string | null;
}
