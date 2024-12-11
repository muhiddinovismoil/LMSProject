import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { IUser, UserService } from 'src/user/user.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  register(createAuthDto: CreateAuthDto) {
    console.log(this.configService.get<string>('CLIENT_ID'));
    const result = this.userService.save(createAuthDto);

    return result;
  }

  login(updateAuthDto: UpdateAuthDto): IUser | string {
    const result = this.userService.findOne(updateAuthDto.email);
    return result;
  }
}
