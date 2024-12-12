import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  @Inject('apiKey')
  apiKey: string;
  constructor(
    @Inject('userRepo') private readonly userRepository: UserRepository,
    @Inject('userSecret') private readonly userSecret: string,
    @Inject('randomString') private readonly randomString: any,
  ) {}
  // constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.randomString;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userSecret;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.apiKey;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
