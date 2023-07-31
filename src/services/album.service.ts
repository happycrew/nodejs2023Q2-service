import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateAlbumDto } from 'src/types/interfaces';
import { Album } from 'src/types/types';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private database: DBService) {}

  getAlbums(): Album[] {
    return this.database.getAlbums();
  }

  getAlbum(id: string): Album {
    return this.database.getAlbum(id);
  }

  addNewAlbum(albumData: CreateAlbumDto): Album {
    const album = {
      id: v4(),
      year: albumData.year,
      name: albumData.name,
      artistId: albumData.artistId,
    };

    this.database.addNewAlbum(album);
    return album;
  }
}
