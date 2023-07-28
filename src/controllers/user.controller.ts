import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { User } from '../types/types';
import { CreateUserDto } from 'src/types/interfaces';
import { UserService } from 'src/services/user.service';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', new ParseUUIDPipe()) id: string): User {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid user id');

    const user = this.userService.getUser(id);

    if (!user) {
      throw new HttpException(`User with this id - ${id} - doesn't exist`, 404);
    }
    return user;
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    const { login, password } = userData;
    const isValidUser =
      typeof login === 'string' && typeof password === 'string';

    if (!isValidUser) {
      throw new HttpException(
        'Request body does not contain required fields',
        400,
      );
    }

    return this.userService.addNewUser(userData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid user id');
    const user = this.userService.getUser(id);
    if (!user) {
      throw new HttpException(`User with this id - ${id} - doesn't exist`, 404);
    }
    this.userService.deleteUser(id);
    return;
  }
}
