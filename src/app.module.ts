import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { UserModule } from './modules/user.module';
import { TrackModule } from './modules/track.module';
import { ArtistModule } from './modules/artist.module';
import { AlbumController } from './controllers/album.controller';

@Module({
  imports: [UserModule, DBModule, TrackModule, ArtistModule, AlbumController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
