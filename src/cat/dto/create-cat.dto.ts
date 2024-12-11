import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsInt()
  @IsPositive()
  age: number;
}
