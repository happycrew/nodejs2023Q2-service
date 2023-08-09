import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
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

  @Delete('/artist/:id')
  @HttpCode(204)
  delArtistFromFav(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid artist id');

    const artist = this.database.getArtist(id);

    if (!artist)
      throw new NotFoundException(`Artist with id - ${id} - not found`);

    this.favsService.deleteFromFavs(id, 'artists');
  }

  @Delete('/track/:id')
  @HttpCode(204)
  delTrackFromFav(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid track id');

    const track = this.database.getTrack(id);

    if (!track)
      throw new NotFoundException(`Track with id - ${id} - not found`);

    this.favsService.deleteFromFavs(id, 'tracks');
  }

  @Delete('/album/:id')
  @HttpCode(204)
  delAlbumFromFav(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid album id');

    const album = this.database.getAlbum(id);

    if (!album)
      throw new NotFoundException(`Album with id - ${id} - not found`);

    this.favsService.deleteFromFavs(id, 'albums');
  }
}
