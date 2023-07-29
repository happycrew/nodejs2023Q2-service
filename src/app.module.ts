import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { UserModule } from './modules/user.module';
import { TrackModule } from './modules/track.module';

@Module({
  imports: [UserModule, DBModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
