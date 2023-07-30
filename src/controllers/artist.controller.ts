import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ArtistService } from 'src/services/artist.service';
import { CreateArtistDto } from 'src/types/interfaces';
import { Artist } from 'src/types/types';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid arist id');
    const artist = this.artistService.getArtist(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id - ${id} doent't exist `);
    }

    return artist;
  }

  @Post()
  addArtist(@Body() artistData: CreateArtistDto) {
    const isValidData =
      typeof artistData.grammy !== 'boolean' || !artistData.name;
    if (isValidData)
      throw new BadRequestException('Required fields not filled');
    return this.artistService.addNewArtist(artistData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid arist id');
    const artist = this.artistService.getArtist(id);
    if (!artist)
      throw new NotFoundException(`Artist with id - ${id} doesn't exist`);

    this.artistService.deleteArtist(id);
    return;
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() artistData: CreateArtistDto) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid artist id');

    if (!artistData.name || typeof artistData.grammy !== 'boolean') {
      throw new BadRequestException('Fields not valid');
    }

    const newArtist = this.artistService.updateArtist(artistData, id);

    if (!newArtist)
      throw new NotFoundException(`Artist with id - ${id} not found`);

    return newArtist;
  }
}
