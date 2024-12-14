import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model, MongooseError } from 'mongoose';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

const users = [];
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async findAll(): Promise<User[]> {
    if (users.length !== 0) {
      return users;
    }
    const newUsers = await this.userModel.find().exec();
    users.push(...newUsers);
    return users;
  }
  async create(user: RegisterAuthDto): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log({
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
      });

      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new NotFoundException('USER alaready exists');
      }
      // if (error instanceof MongooseError) {
      //   console.error(error);
      // }
    }
  }

  find(user: LoginAuthDto): Promise<User> {
    return this.userModel.findOne({ email: user.email }).exec();
  }
}
