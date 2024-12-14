import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Min(3)
  password: string;
}
