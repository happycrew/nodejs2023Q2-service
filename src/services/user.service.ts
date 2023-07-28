import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private database: DBService) {}

  getUsers() {
    return this.database.getUsers();
  }
}
