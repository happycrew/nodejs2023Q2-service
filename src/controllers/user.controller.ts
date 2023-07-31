import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../types/types';
import { CreateUserDto, UpdatePasswordDto } from 'src/types/interfaces';
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
  getUser(@Param('id') id: string): User {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid user id');

    const user = this.userService.getUser(id);

    if (!user) {
      throw new NotFoundException(`User with this id - ${id} - doesn't exist`);
    }
    return user;
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    const { login, password } = userData;
    const isValidUser: boolean =
      typeof login === 'string' && typeof password === 'string';

    if (!isValidUser) {
      throw new BadRequestException('Required fields not filled');
    }

    return this.userService.addNewUser(userData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid user id');
    const user = this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException(`User with this id - ${id} - doesn't exist`);
    }
    this.userService.deleteUser(id);
    return;
  }

  @Put(':id')
  updatePassword(
    @Body() updatePass: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    if (!isUUID(id, 4)) throw new BadRequestException('Invalid user id');
    return this.userService.updateUserPassword(updatePass, id);
  }
}
