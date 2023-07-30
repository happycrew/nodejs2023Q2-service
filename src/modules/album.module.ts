import { Module } from '@nestjs/common';
import { AlbumController } from 'src/controllers/album.controller';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [AlbumController],
  providers: [AlbumModule],
})
export class AlbumModule {}
