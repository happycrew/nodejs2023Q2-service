import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
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

  @Get('id')
  getUserById(@Param('id', new ParseUUIDPipe()) id: string): User {
    const user = this.appService.userService.get(id);
    if (!user) {
      throw new HttpException(
        `User with ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
