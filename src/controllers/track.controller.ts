import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { TrackService } from 'src/services/track.service';
import { CreateTrackDto } from 'src/types/interfaces';
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
      throw new NotFoundException(`Track with this id - ${id} - doesn't exist`);
    }
    return track;
  }

  @Post()
  createTrack(@Body() trackData: CreateTrackDto): Track {
    const { name, duration } = trackData;

    const isValidTrack: boolean =
      typeof name === 'string' && typeof duration === 'number';

    if (!isValidTrack) {
      throw new BadRequestException('Required fields not filled');
    }

    return this.trackService.addNewTrack(trackData);
  }
}
