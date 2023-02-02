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
import { TracksService } from './tracks.service';
import { validateUUIDV4 } from '../utils';
import { Track } from '../interfaces/track.interface';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Controller('track')
export class TracksController {
  constructor(private trackService: TracksService) {
  }

  @UsePipes( new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(dto)
  }

  @Get()
  async getAll():Promise<Track[]> {
    return await this.trackService.getAll<Track>()
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Track> {
    validateUUIDV4( id )
    return await this.trackService.getOne<Track>( id )
  }

  @UsePipes( new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: string, @Body() dto: UpdateTrackDto
  ): Promise<Track> {
    validateUUIDV4( id )
    return this.trackService.update( id, dto )
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    validateUUIDV4( id )
    await this.trackService.delete<Track>( id )
  }
}
