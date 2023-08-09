import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateTrackDto } from 'src/types/interfaces';
import { Track } from 'src/types/types';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private database: DBService) {}

  getTracks(): Track[] {
    return this.database.getTracks();
  }

  getTrack(id: string): Track {
    return this.database.getTrack(id);
  }

  addNewTrack(trackData: CreateTrackDto): Track {
    const track = {
      id: v4(),
      name: trackData.name,
      duration: trackData.duration,
      artistId: trackData.artistId,
      albumId: trackData.albumId,
    };

    this.database.addNewTrack(track);
    return track;
  }

  deleteTrack(id: string): void {
    this.database.deleteTrack(id);
  }

  updateTrack(updateTrack: CreateTrackDto, id: string) {
    const track = this.database.getTrack(id);
    if (!track)
      throw new NotFoundException(`Track with id - ${id} doesn't exist`);
    const updatedTrack = { ...track, ...updateTrack };
    this.database.updateTrack(updatedTrack, id);
    return updatedTrack;
  }
}
