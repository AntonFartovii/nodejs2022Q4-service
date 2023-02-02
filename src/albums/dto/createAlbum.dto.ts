import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  artistId: string | null;


}
