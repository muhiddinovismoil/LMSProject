import { Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { forgetPasswordSchem } from './dto/update-password';

@Injectable()
export class AuthService {
  constructor(private readonly userReposity: UserRepository) {}
  async create(signUpAuthDto: SignUpAuthDto) {
    return this.userReposity.create(signUpAuthDto);
  }
  async login(signInAuthDto: SignInAuthDto) {
    return this.userReposity.login(signInAuthDto);
  }
  async verifyOtp(email: string, otp_code: string) {
    return this.userReposity.verifyUserAcc(email, otp_code);
  }
  async logout() {
    return this.userReposity.logout();
  }
  async newOtpVerification(email: string) {
    return this.userReposity.updateOtpVerification(email);
  }
  async forgetPassword(forgetPassSchem: forgetPasswordSchem) {
    return this.userReposity.forgetPassword(forgetPassSchem);
  }
  async tokenRefresh(refreshToken: string) {
    return this.userReposity.refreshTokens(refreshToken);
  }
}
