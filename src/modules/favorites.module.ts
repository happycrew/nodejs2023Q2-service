import { Module } from '@nestjs/common';
import { FavsController } from 'src/controllers/favorites.controller';
import { DBModule } from 'src/db/db.module';
import { FavsService } from 'src/services/favorites.service';

@Module({
  imports: [DBModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
