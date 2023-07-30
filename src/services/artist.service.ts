import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateArtistDto } from 'src/types/interfaces';
import { Artist } from 'src/types/types';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private database: DBService) {}

  getArtists(): Artist[] {
    return this.database.getArtists();
  }

  getArtist(id: string): Artist {
    return this.database.getArtist(id);
  }

  addNewArtist(artistData: CreateArtistDto): Artist {
    const artist = {
      id: v4(),
      name: artistData.name,
      grammy: artistData.grammy,
    };

    this.database.addNewArtist(artist);
    return artist;
  }

  deleteArtist(id: string): void {
    this.database.deleteArtist(id);
  }
}
