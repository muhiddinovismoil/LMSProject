import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './repository/course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}
  async create(createCourseDto: CreateCourseDto) {
    try {
      return await this.courseRepository.createCourse(createCourseDto);
    } catch (error) {
      return error;
    }
  }
  async findAll(limit: number, offset: number) {
    try {
      return await this.courseRepository.getAllCourse(limit, offset);
    } catch (error) {
      return error;
    }
  }
  async findOne(id: number) {
    try {
      return await this.courseRepository.getCourseById(id);
    } catch (error) {
      return error;
    }
  }
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      return await this.courseRepository.updateCourseById(id, updateCourseDto);
    } catch (error) {
      return error;
    }
  }
  async remove(id: number) {
    try {
      return await this.courseRepository.deleteCourseById(id);
    } catch (error) {
      return error;
    }
  }
}
