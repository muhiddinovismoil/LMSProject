import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInAuthDto {
  @ApiProperty({
    type: String,
    description: 'User username',
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    type: String,
    description: 'User password',
  })
  @IsString()
  @IsStrongPassword()
  password: string;
}
