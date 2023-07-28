import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { User } from './db/types';

@Injectable()
export class AppService {
  constructor(readonly userService: InMemoryDBService<User>) {}
  getHello(): string {
    return 'Hello World!';
  }
}
