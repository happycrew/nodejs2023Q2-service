/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/types/interfaces';
import { User } from 'src/types/types';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private database: DBService) {}

  getUsers(): User[] {
    return this.database.getUsers();
  }

  getUser(id: string): User {
    return this.database.getUser(id);
  }

  addNewUser(userData: CreateUserDto) {
    const user: User = {
      id: v4(),
      login: userData.login,
      password: userData.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const { password, ...userWithoutPass } = user;

    this.database.addNewUser(user);
    return userWithoutPass;
  }

  deleteUser(id: string): void {
    this.database.deleteUser(id);
  }

  updateUserPassword(updatePass: UpdatePasswordDto, id: string) {
    const user = this.database.getUser(id);

    const checkPasswords = !updatePass.newPassword || !updatePass.oldPassword;
    if (checkPasswords) {
      throw new BadRequestException('No passwords here');
    }

    if (!user) {
      throw new NotFoundException(`User with id - ${id} doens't exist`);
    }

    if (updatePass.oldPassword !== user.password) {
      throw new HttpException('Password mismatch', 403);
    }

    const newUser: User = {
      ...user,
      password: updatePass.newPassword,
      version: ++user.version,
      updatedAt: Date.now(),
    };

    const { password, ...userWithoutPass } = newUser;

    this.database.updateUserPassword(newUser, id);
    return userWithoutPass;
  }
}
