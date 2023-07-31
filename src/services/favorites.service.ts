import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { FavoritesResponse } from 'src/types/interfaces';

@Injectable()
export class FavsService {
  constructor(private database: DBService) {}

  getFavs(): FavoritesResponse {
    return this.database.getFavs();
  }

  addToFavs(id: string, data: string): void {
    this.database.addToFavs(id, data);
  }

  deleteFromFavs(id: string, data: string): void {
    this.database.deleteFromFavs(id, data);
  }
}
