import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { User } from '../types/types';
import { AppService } from 'src/app.service';
import { v4 } from 'uuid';
import { CreateUserDto } from 'src/types/interfaces';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  // @Get('id')
  // getUserById(@Param('id', new ParseUUIDPipe()) id: string): User {
  //   const user = this.appService.userService.get(id);
  //   if (!user) {
  //     throw new HttpException(
  //       `User with ${id} doesn't exist`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return user;
}
