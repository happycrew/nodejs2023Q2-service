import { Module } from '@nestjs/common';
import { TrackController } from 'src/controllers/track.controller';
import { DBModule } from 'src/db/db.module';
import { TrackService } from 'src/services/track.service';

@Module({
  imports: [DBModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
