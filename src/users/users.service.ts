import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'ADMIN' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'ENGINEER' },
    { id: 3, name: 'Jim Doe', email: 'jim.doe@example.com', role: 'INTERN' },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const filteredUsers = this.users.filter((user) => user.role === role);
      if (filteredUsers.length === 0) {
        throw new NotFoundException('No users found with the specified role');
      }
      return filteredUsers;
    }
    return this.users;
  }
  
  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  create(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
    const newUser = {
      id: userByHighestId.id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: UpdateUserDto) {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...user };
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }
}
