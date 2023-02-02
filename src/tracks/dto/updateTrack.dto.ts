import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  duration: number; // integer number
}
