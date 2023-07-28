import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateUserDto } from 'src/types/interfaces';
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
}
