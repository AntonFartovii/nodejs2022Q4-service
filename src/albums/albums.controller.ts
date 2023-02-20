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
import { validateUUIDV4 } from '../utils';
import { Album } from '../interfaces/album.interface';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {
  }

  @UsePipes( new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAlbumDto): Promise<AlbumEntity> {
    return await this.albumService.create(dto)
  }

  @Get()
  async getAll():Promise<Album[]> {
    return await this.albumService.findAll()
  }

  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string): Promise<AlbumEntity> {
    validateUUIDV4( id )
    return await this.albumService.findOne( id )
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
    await this.albumService.delete( id )
  }
}
