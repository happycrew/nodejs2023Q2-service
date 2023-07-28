import { Injectable } from '@nestjs/common';
import { User } from './types/types';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
