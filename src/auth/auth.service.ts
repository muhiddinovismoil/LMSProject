import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('userRepo') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  register(registerAuthDto: RegisterAuthDto) {
    return this.userRepository.create(registerAuthDto);
  }
  async login(loginAuthDto: LoginAuthDto) {
    const currentUser = await this.userRepository.find(loginAuthDto);
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    console.log(currentUser);

    const payload = {
      sub: currentUser.email,
      name: currentUser.name,
      role: currentUser.role,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }
}
