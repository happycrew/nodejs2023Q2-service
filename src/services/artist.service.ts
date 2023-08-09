import { Injectable, NotFoundException } from '@nestjs/common';
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

  updateArtist(artistData: CreateArtistDto, artistId?: string): Artist {
    const artist = this.database.getArtist(artistId);

    if (!artist)
      throw new NotFoundException(`Artist with id - ${artistId} not found`);
    const newArtist = { ...artist, ...artistData };
    this.database.updateArtist(newArtist, artistId);
    return newArtist;
  }
}
