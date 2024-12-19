import { Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { SignInAuthDto } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userReposity: UserRepository) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    return this.userReposity.create(signUpAuthDto);
  }

  async login(signInAuthDto: SignInAuthDto) {
    return this.userReposity.create(signInAuthDto);
  }

  async otp() {
    return this.userReposity.create(signInAuthDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
