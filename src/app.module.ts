import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule, DBModule],
  controllers: [AppController],
  // exports: [AppService],
  providers: [AppService],
})
export class AppModule {}
