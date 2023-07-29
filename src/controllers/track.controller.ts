import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  Param,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { TrackService } from 'src/services/track.service';
import { Track } from 'src/types/types';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string): Track {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid track id');

    const track = this.trackService.getTrack(id);

    if (!track) {
      throw new HttpException(
        `Track with this id - ${id} - doesn't exist`,
        404,
      );
    }
    return track;
  }
}
