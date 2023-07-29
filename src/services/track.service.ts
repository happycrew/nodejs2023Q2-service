import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Track } from 'src/types/types';

@Injectable()
export class TrackService {
  constructor(private database: DBService) {}

  getTracks(): Track[] {
    return this.database.getTracks();
  }

  getTrack(id: string): Track {
    return this.database.getTrack(id);
  }
}
