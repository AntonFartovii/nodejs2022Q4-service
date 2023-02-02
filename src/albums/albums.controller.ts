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
import { AlbumsService } from './albums.service';
import { CreateTrackDto } from '../tracks/dto/createTrack.dto';
import { Track } from '../interfaces/track.interface';
import { validateUUIDV4 } from '../utils';
import { UpdateTrackDto } from '../tracks/dto/updateTrack.dto';
import { Album } from '../interfaces/album.interface';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {
  }

  @UsePipes( new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(dto)
  }

  @Get()
  async getAll():Promise<Album[]> {
    return await this.albumService.getAll<Album>()
  }

  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string): Promise<Album> {
    validateUUIDV4( id )
    return await this.albumService.getOne<Album>( id )
  }

  @UsePipes( new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: string, @Body() dto: UpdateAlbumDto
  ): Promise<Album> {
    validateUUIDV4( id )
    return this.albumService.update( id, dto )
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    validateUUIDV4( id )
    await this.albumService.delete<Album>( id )
  }
}
