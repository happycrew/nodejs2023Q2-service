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
import { CreateUserDto } from 'src/db/interfaces';
import { v4 } from 'uuid';

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

  @Post()
  createUser(@Body() newUser: CreateUserDto): User {
    const { login, password } = newUser;
    const isValudUser =
      typeof login === 'string' && typeof password === 'string';
    if (!isValudUser)
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    const user: User = {
      id: v4(),
      login: newUser.login,
      password: newUser.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.appService.userService.create(user);
  }
}
