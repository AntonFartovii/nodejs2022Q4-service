import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';


export class UpdateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
