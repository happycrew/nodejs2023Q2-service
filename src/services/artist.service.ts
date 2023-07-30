import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Artist } from 'src/types/types';

@Injectable()
export class ArtistService {
  constructor(private database: DBService) {}

  getArtists(): Artist[] {
    return this.database.getArtists();
  }

  getArtist(id: string): Artist {
    return this.database.getArtist(id);
  }
}
