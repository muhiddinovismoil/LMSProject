import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { resetPasswordSchem } from '../auth/dto/update-password';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getProfile(id: number) {
    return await this.userRepository.findOne(id);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
  async updatePass(updatePassDto: resetPasswordSchem) {
    return this.userRepository.updatePassword(updatePassDto);
  }
  async remove(id: number) {
    return this.userRepository.remove(id);
  }
  async setLogo(id: number, logoPath: string) {
    return this.userRepository.saveProfileLogo(id, logoPath);
  }
}
