import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto } from './dto/createArtist.dto';
import { validateUUIDV4 } from '../utils';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {
  }

  @UsePipes( new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateArtistDto): Promise<ArtistEntity> {
    return await this.artistService.create(dto)
  }

  @Get()
  async getAll() {
    return await this.artistService.findAll()
  }

  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string) {
    validateUUIDV4( id )
    return await this.artistService.findOne( id )
  }

  @UsePipes( new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateArtistDto) {
    validateUUIDV4( id )
    return await this.artistService.update( id, dto)
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    validateUUIDV4( id )
    await this.artistService.delete( id )
  }
}
