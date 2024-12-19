import { Controller, Post, Body, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { forgetPasswordSchem } from './dto/update-password';
import { SignInAuthDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() createAuthDto: SignUpAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('signin')
  login(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.login(signInAuthDto);
  }

  @Post('verify')
  verify(@Body('email') email: string, @Body('otp_code') otp_code: string) {
    return this.authService.verifyOtp(email, otp_code);
  }

  @Delete('logout')
  logOut() {
    return this.authService.logout();
  }
  @Post('otp-forget-password')
  otpForgetPassword(@Body('email') email: string) {
    return this.authService.newOtpVerification(email);
  }
  @Post('refreshToken')
  refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.tokenRefresh(refreshToken);
  }

  @Post('forgetPassword')
  forgetPassword(@Body() forgetPassSchem: forgetPasswordSchem) {
    return this.authService.forgetPassword(forgetPassSchem);
  }
}
