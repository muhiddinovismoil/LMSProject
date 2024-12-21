import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class CreateGroupDto {
  @ApiProperty({
    type: String,
    description: "Group's name",
  })
  @IsString()
  @Min(3)
  @Max(15)
  name: string;
  @IsString()
  @ApiProperty({
    type: String,
    description: "Group's description",
  })
  description: string;
  @ApiProperty({
    type: String,
    description: "Group's course_id",
  })
  @IsNumber()
  course_id: number;
  @ApiProperty({
    type: String,
    description: "Group's price",
  })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, description: "Group's room" })
  @IsString()
  room: string;

  @ApiProperty({
    type: [String],
    description: 'List of students in the group',
  })
  @IsArray()
  students: string[];

  @ApiProperty({
    type: String,
    description: 'Teacher of the group',
  })
  @IsString()
  teacher: string;

  @IsDateString()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    type: String,
    description: "Group's end date",
  })
  @IsDateString()
  @Type(() => Date)
  end_date: Date;
}
