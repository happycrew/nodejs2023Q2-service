import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private database: DBService) {}
}
