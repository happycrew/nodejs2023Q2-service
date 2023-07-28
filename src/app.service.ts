import { Injectable } from '@nestjs/common';
import { User } from './db/types';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
