import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}
