import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { IUser, UserService } from 'src/user/user.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  register(createAuthDto: CreateAuthDto) {
    const result = this.userService.save(createAuthDto);
    return result;
  }

  login(updateAuthDto: UpdateAuthDto): IUser | string {
    const result = this.userService.findOne(updateAuthDto.email);
    return result;
  }
}
