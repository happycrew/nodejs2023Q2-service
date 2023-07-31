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

  @Post('artist/:id')
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
}
