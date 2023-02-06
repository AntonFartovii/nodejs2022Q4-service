import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesRepsonse } from '../interfaces/favorites.interface';
import { validateUUIDV4 } from '../utils';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getAll(): Promise<FavoritesRepsonse> {
    return await this.favsService.getAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/:type/:id')
  async addTrack(
    @Param('id') id: string,
    @Param('type') type: string
    ) {
    validateUUIDV4(id);
    return await this.favsService.addEntity( id, type );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:type/:id')
  async deleteTrack(
    @Param('id') id: string,
    @Param('type') type: string
  ) {
    validateUUIDV4(id);
    await this.favsService.deleteEntity( id, type );
  }

}
