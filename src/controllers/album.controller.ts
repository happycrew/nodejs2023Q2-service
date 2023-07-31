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
import { AlbumService } from 'src/services/album.service';
import { CreateAlbumDto } from 'src/types/interfaces';
import { Album } from 'src/types/types';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): Album[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') id: string): Album {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid album id');
    const album = this.albumService.getAlbum(id);
    if (!album) throw new NotFoundException(`Album with id - ${id} not found`);
    return album;
  }

  @Post()
  addAlbum(@Body() albumData: CreateAlbumDto): Album {
    if (!albumData.name || !albumData.year)
      throw new BadRequestException('Required fields not filled');

    return this.albumService.addNewAlbum(albumData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): void {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid album id');
    const album = this.albumService.getAlbum(id);
    if (!album)
      throw new NotFoundException(`Album with id - ${id} - not found`);

    this.albumService.deleteAlbum(id);
    return;
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() albumData: CreateAlbumDto) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid album id');

    const isValidData =
      !albumData.name ||
      !albumData.year ||
      !(albumData.artistId === null || typeof albumData.artistId === 'string');

    if (isValidData)
      throw new BadRequestException('Required fields not filled');

    const newAlbum = this.albumService.updateAlbum(albumData, id);

    if (!newAlbum)
      throw new NotFoundException(`Album with id - ${id} - not found`);

    return newAlbum;
  }
}
