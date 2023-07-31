import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

@Injectable()
export class FavsSerivce {
  constructor(private database: DBService) {}
}
