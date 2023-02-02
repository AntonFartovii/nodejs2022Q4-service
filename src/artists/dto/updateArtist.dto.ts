import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;


  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
