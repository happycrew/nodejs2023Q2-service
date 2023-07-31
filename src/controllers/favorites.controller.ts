import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { DBService } from 'src/db/db.service';
import { FavsService } from 'src/services/favorites.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private database: DBService,
  ) {}

  @Get()
  getFavs() {
    return this.favsService.getFavs();
  }

  @Post('/artist/:id')
  @HttpCode(201)
  addArtistToFavs(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid artist id');

    const artist = this.database.getArtist(id);

    if (!artist)
      throw new UnprocessableEntityException(
        `Artist with id - ${id} - not found!`,
      );

    this.favsService.addToFavs(id, 'artists');
  }

  @Post('/track/:id')
  @HttpCode(201)
  addTrackToFavs(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid track id');

    const track = this.database.getTrack(id);

    if (!track)
      throw new UnprocessableEntityException(
        `Track with id - ${id} - not found!`,
      );
    this.favsService.addToFavs(id, 'tracks');
  }

  @Post('/album/:id')
  @HttpCode(201)
  addAlbumToFavs(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid album id');

    const album = this.database.getAlbum(id);

    if (!album)
      throw new UnprocessableEntityException(
        `Album with id - ${id} - not found!`,
      );

    this.favsService.addToFavs(id, 'albums');
  }
}
