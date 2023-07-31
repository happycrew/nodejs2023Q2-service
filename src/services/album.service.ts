import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Album } from 'src/types/types';

@Injectable()
export class AlbumService {
  constructor(private database: DBService) {}

  getAlbums(): Album[] {
    return this.database.getAlbums();
  }

  getAlbum(id: string): Album {
    return this.database.getAlbum(id);
  }
}
