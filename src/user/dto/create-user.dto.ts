import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;
  @ApiProperty({
    type: Number,
    description: "User's age",
  })
  age: number;

  @ApiProperty({
    type: String,
    description: 'User gender',
  })
  gender: string;
  status: string;
  is_merried: boolean;
  role: string;
}
