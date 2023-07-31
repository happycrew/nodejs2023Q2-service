import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private database: DBService) {}

  getFavs() {
    return this.database.getFavs();
  }

  addToFavs(id: string, data: string) {
    this.database.addToFavs(id, data);
  }
}
