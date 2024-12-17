import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}
  async create(createUserDto) {
    console.log({ createUserDto });

    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
