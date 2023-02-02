import { Controller, Get, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesRepsonse } from '../interfaces/favorites.interface';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {
  }

  @Get()
  async getAll(): Promise<FavoritesRepsonse> {
    return await this.favsService.getAll()
  }

  @Post('/track/:id')
  async addTrack(@Param('id') id: string) {
    return await this.favsService.addEntity(id, 'tracks')
  }
}
