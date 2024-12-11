import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  // @IsStrongPassword()
  password: string;

  @IsString()
  @MinLength(3)
  name: string;
}
