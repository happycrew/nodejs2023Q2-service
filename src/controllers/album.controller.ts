import { Controller, Get } from '@nestjs/common';
import { AlbumService } from 'src/services/album.service';
import { Album } from 'src/types/types';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): Album[] {
    return this.albumService.getAlbums();
  }
}
