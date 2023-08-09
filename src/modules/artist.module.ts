import { Module } from '@nestjs/common';
import { ArtistController } from 'src/controllers/artist.controller';
import { DBModule } from 'src/db/db.module';
import { ArtistService } from 'src/services/artist.service';

@Module({
  imports: [DBModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
