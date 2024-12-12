import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsPositive()
  gender: string;
}
