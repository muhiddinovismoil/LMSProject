import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @Min(3)
  name?: string;

  @IsNumber()
  @IsPositive()
  age?: number;

  @IsString()
  @IsPositive()
  gender?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Min(3)
  password: string;
}
