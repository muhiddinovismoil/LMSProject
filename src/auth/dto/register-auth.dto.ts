import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class RegisterAuthDto {
  @IsString()
  @IsOptional()
  @Min(3)
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  age?: number;

  @IsString()
  @IsPositive()
  @IsOptional()
  gender?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
