import { Module } from '@nestjs/common';
import { AlbumController } from 'src/controllers/album.controller';
import { DBModule } from 'src/db/db.module';
import { AlbumService } from 'src/services/album.service';

@Module({
  imports: [DBModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
