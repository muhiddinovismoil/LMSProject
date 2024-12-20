import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, Min } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: "Category's name",
  })
  @IsString()
  @Min(3)
  @Max(15)
  name: string;
  @IsString()
  @ApiProperty({
    type: String,
    description: "Category's description",
  })
  description: string;
}
