import { Injectable } from '@nestjs/common';
import { User } from 'src/types/types';

@Injectable()
export class DBService {
  private readonly users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  addNewUser(newUser: User): void {
    this.users.push(newUser);
  }

  deleteUser(id: string): void {
    const idUser = this.users.findIndex((user) => user.id === id);
    this.users.splice(idUser, 1);
  }
}
