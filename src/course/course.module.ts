import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './repository/course.repository';
import { DatabaseModule } from '../database/database.module';
import { courseProvider } from './course.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [CourseRepository, ...courseProvider, CourseService],
  exports: [CourseRepository],
})
export class CourseModule {}
