import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async create(user: RegisterAuthDto): Promise<User> {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }
  find(user: LoginAuthDto): Promise<User> {
    return this.userModel.findOne({ email: user.email }).exec();
  }
}
