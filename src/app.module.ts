import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controllers/user.controller';
import { AppService } from './app.service';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  exports: [AppService],
  providers: [AppService, InMemoryDBService],
})
export class AppModule {}
