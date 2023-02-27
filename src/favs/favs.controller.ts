import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesRepsonse } from '../interfaces/favorites.interface';
import { validateUUIDV4 } from '../utils';
import { FavoritesEntityRes } from './entity/favorites.entity';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(): Promise<FavoritesEntityRes> {
    return await this.favsService.getAll()
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/track/:id')
  async addTrack(@Param('id') id: string) {
    validateUUIDV4( id )
    return await this.favsService.addEntity( id, 'tracks', 'tracksService' )
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/album/:id')
  async addAlbum(@Param('id') id: string) {
    validateUUIDV4( id )
    return await this.favsService.addEntity( id, 'albums', 'albumsService' )
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/artist/:id')
  async addArtist(@Param('id') id: string) {
    validateUUIDV4( id )
    return await this.favsService.addEntity( id, 'artists', 'artistsService' )
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/track/:id')
  async deleteTrack(@Param('id') id: string) {
    validateUUIDV4( id )
    await this.favsService.deleteEntity( id, 'tracks', 'tracksService' )
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/album/:id')
  async deleteAlbum(@Param('id') id: string) {
    validateUUIDV4( id )
    await this.favsService.deleteEntity( id, 'albums', 'albumsService' )
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/artist/:id')
  async deleteArtist(@Param('id') id: string) {
    validateUUIDV4( id )
    await this.favsService.deleteEntity( id, 'artists', 'artistsService' )
  }
}
