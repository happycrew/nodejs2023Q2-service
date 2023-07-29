import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { TrackService } from 'src/services/track.service';

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [TrackService],
})
export class TrackModule {}
