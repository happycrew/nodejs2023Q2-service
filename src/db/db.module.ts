import { DBService } from './db.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
