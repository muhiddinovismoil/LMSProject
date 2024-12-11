import { Injectable } from '@nestjs/common';

export interface IUser {
  email: string;
  password: string;
  name: string;
  id: number;
}

const users = new Map<string, IUser>();

@Injectable()
export class UserService {
  save(user: Omit<IUser, 'id'>) {
    const userExists = users.has(user.email);
    if (userExists) {
      return `User Alaready exists!.`;
    }
    const id = users.size + 1;
    users.set(user.email, { ...user, id });
    return `created`;
  }

  findOne(email: string) {
    const userExists = users.has(email);
    if (!userExists) {
      return `User not found!`;
    }

    return users.get(email);
  }
}
