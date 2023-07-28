import { Controller, Get } from '@nestjs/common';
import { User } from '../db/types';
import { AppService } from 'src/app.service';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(): User[] {
    return this.appService.userService.getAll();
  }
}
