import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { checkPassword, hashingPassword } from '../../helpers/hashing';
import { SignInAuthDto } from '../../auth/dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../common/constants/jwt.contsant';
import { OTP } from '../entities/otp.entity';
import { generateOtp } from '../../helpers/otp';
import { sendEmail } from '../../helpers/sendMail';
import { MailerService } from '@nestjs-modules/mailer';
import { SignUpAuthDto } from '../../auth/dto/signup-auth.dto';
import { UserStatus } from '../../common/enums/user.status';
import {
  forgetPasswordSchem,
  resetPasswordSchem,
} from '../../auth/dto/update-password';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userModel: typeof User,
    @Inject('OTP_REPO')
    private readonly otpModel: typeof OTP,
    private jwtService: JwtService,
    private readonly mailHelper: MailerService,
  ) {}

  async create(signUpUserDto: SignUpAuthDto) {
    try {
      const getUser = await this.userModel.findOne({
        where: { username: signUpUserDto.username },
      });
      if (!getUser) {
        const newUser = new this.userModel({
          ...signUpUserDto,
          password: await hashingPassword(signUpUserDto.password),
        });
        await newUser.save();
        const otp = await generateOtp();
        await sendEmail(
          this.mailHelper,
          signUpUserDto.email,
          'Welcome to Our Platform',
          'Thank you for registering!',
          `<h1>Welcome!</h1><p>We are glad to have you on board.<br>Here is your otp code and don't give it to others please: ${otp}</p>`,
        );
        const newOtp = new this.otpModel({
          otp_code: otp,
          user_id: newUser.id,
        });
        await newOtp.save();
        return {
          message: 'You are registered',
          newUserId: newUser.id,
        };
      }
      throw new BadRequestException('User already registered before');
    } catch (error) {
      return error;
    }
  }
  async login(signInAuthDto: SignInAuthDto) {
    try {
      const getUser = await this.userModel.findOne({
        where: { username: signInAuthDto.username },
      });
      if (!getUser) {
        throw new NotFoundException('User not registered yet');
      }
      if (getUser.status == UserStatus.inactive) {
        throw new BadRequestException('Your account is not verified');
      }
      const checkPass = await checkPassword(
        getUser.password,
        signInAuthDto.password,
      );
      if (!checkPass) {
        throw new UnauthorizedException('Your password or username not suit');
      }
      const payload = {
        sub: getUser.id,
        username: getUser.username,
        name: getUser.name,
        role: getUser.role,
      };
      const payload2 = {
        sub: getUser.id,
        username: getUser.username,
        name: getUser.name,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload2),
      };
    } catch (error) {
      return error;
    }
  }
  async logout() {
    return {
      msg: 'You are logout successfully',
    };
  }
  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.access.secret,
      });
      const { id, email } = decoded;
      const newAccessToken = this.jwtService.sign(
        { id, email },
        {
          secret: jwtConstants.access.secret,
          expiresIn: jwtConstants.access.expiresIn,
        },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid or expired refresh token ${error}`,
      );
    }
  }
  async verifyUserAcc(email: string, otp_code: string) {
    try {
      const getUser = await this.userModel.findOne({ where: { email: email } });
      if (!getUser) {
        throw new NotFoundException('User not found');
      }
      const getOtp = await this.otpModel.findOne({
        where: { user_id: getUser.id },
      });
      if (!getOtp) {
        throw new NotFoundException('Your otp expired already');
      }
      if (getOtp.otp_code == otp_code) {
        await this.userModel.update(
          { status: UserStatus.active },
          { where: { email: email } },
        );
        await this.otpModel.destroy({ where: { user_id: getUser.id } });
        return {
          msg: 'Your account is now activated',
        };
      }
    } catch (error) {
      return error;
    }
  }
  async updateOtpVerification(email: string) {
    try {
      const getUser = await this.userModel.findOne({ where: { email: email } });
      if (!getUser) {
        throw new NotFoundException('User not found');
      }
      const otp = await generateOtp();
      await sendEmail(
        this.mailHelper,
        email,
        'Welcome to Our Platform',
        'Thank you for registering!',
        `<h1>Welcome!</h1><p>We are glad to have you on board.<br>Here is your otp code and don't give it to others please: ${otp}</p>`,
      );
      const newOtp = new this.otpModel({
        otp_code: otp,
        user_id: getUser.id,
      });
      await newOtp.save();
      return {
        message: 'Your new otp sended to your email',
      };
    } catch (error) {
      return error;
    }
  }
  async forgetPassword(forgetPassSchem: forgetPasswordSchem) {
    try {
      const findUser = await this.userModel.findOne({
        where: { email: forgetPassSchem.email },
      });
      if (!findUser) {
        throw new NotFoundException('User not found');
      }
      const getOtp = await this.otpModel.findOne({
        where: { user_id: findUser.id },
      });
      if (!getOtp) {
        throw new NotFoundException('OTP not found');
      }
      if (forgetPassSchem.newPassword !== forgetPassSchem.confirmPassword) {
        throw new BadRequestException(
          'Your new password and confirmation password are not suit',
        );
      }
      const hashedPassword = await hashingPassword(forgetPassSchem.newPassword);
      await this.userModel.update(
        { password: hashedPassword },
        { where: { email: forgetPassSchem.email } },
      );
      await this.otpModel.destroy({
        where: { user_id: findUser.id },
      });
      return { msg: 'Your password has been updated successfully' };
    } catch (error) {
      return error;
    }
  }
  async findOne(id: number) {
    try {
      return this.userModel.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
      });
    } catch (error) {
      return error;
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const [affectedRows, [updatedUser]] = await this.userModel.update(
        { ...updateUserDto },
        {
          where: { id: id },
          returning: true,
        },
      );
      if (affectedRows === 0) {
        throw new NotFoundException('User not found');
      }
      return {
        message: 'User updated successfully',
        updatedUser: updatedUser.id,
      };
    } catch (error) {
      return error;
    }
  }
  async updatePassword(updatePassDto: resetPasswordSchem) {
    try {
      const findUser = await this.userModel.findOne({
        where: { email: updatePassDto.email },
      });
      if (findUser) {
        const bool = await checkPassword(
          findUser.password,
          updatePassDto.oldPassword,
        );
        if (bool) {
          const user = await this.userModel.update(
            { password: await hashingPassword(updatePassDto.password) },
            {
              where: { email: updatePassDto.email },
              returning: true,
            },
          );
          return {
            msg: 'User updated successfully',
            updatedUser: user,
          };
        }
        throw new BadRequestException('Your old password not suit');
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      return error;
    }
  }
  async remove(id: number) {
    try {
      const finduser = await this.userModel.findOne({ where: { id: id } });
      if (finduser) {
        await this.userModel.destroy({
          where: {
            id,
          },
        });
        return { message: 'User deleted successfully' };
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      return error;
    }
  }
  async saveProfileLogo(id: number, logoPath: string) {
    try {
      const [affectedRows, [updatedUser]] = await this.userModel.update(
        { profile_log: logoPath },
        {
          where: { id },
          returning: true,
        },
      );
      if (affectedRows === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return {
        message: 'Profile logo updated successfully',
        profileLogo: updatedUser.profile_log,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the profile logo',
      );
    }
  }
}
