import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, IsEmail } from 'class-validator';

export class resetPasswordSchem {
  @ApiProperty({
    type: String,
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User oldPassword',
  })
  @IsStrongPassword()
  oldPassword: string;

  @ApiProperty({
    type: String,
    description: 'User oldPassword',
  })
  @IsStrongPassword()
  password: string;
}
export class forgetPasswordSchem {
  @ApiProperty({
    type: String,
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User otp',
  })
  @IsString()
  otp_code: string;
  @ApiProperty({
    type: String,
    description: 'User password',
  })
  @IsStrongPassword()
  newPassword: string;
  @ApiProperty({
    type: String,
    description: 'User password',
  })
  @IsStrongPassword()
  confirmPassword: string;
}
