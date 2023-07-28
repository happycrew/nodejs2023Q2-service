import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { DBModule } from 'src/db/db.module';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [DBModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
