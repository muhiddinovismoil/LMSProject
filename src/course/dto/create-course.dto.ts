import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';
export class CreateCourseDto {
  @ApiProperty({
    type: String,
    description: "Course's name",
  })
  @IsString()
  @Min(3)
  @Max(15)
  name: string;
  @ApiProperty({
    type: String,
    description: "Course's description",
  })
  @IsString()
  description: string;
  @ApiProperty({
    type: Number,
    description: "Course's category_id",
  })
  @IsNumber()
  category_id: number;
}
