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
    const isValidData = artistData.name || artistData.grammy;
    if (!isValidData)
      throw new BadRequestException('Required fields not filled');
    return this.artistService.addNewArtist(artistData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    const artist = this.artistService.getArtist(id);
    if (!artist)
      throw new NotFoundException(`Artist with id - ${id} doesn't exist`);

    this.artistService.deleteArtist(id);
    return;
  }
}
