import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { AlbumService } from 'src/services/album.service';
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
}
