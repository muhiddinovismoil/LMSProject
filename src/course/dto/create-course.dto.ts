import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';
export class CreateCourseDto {
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
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "Category's description",
  })
  category_id: number;
}
