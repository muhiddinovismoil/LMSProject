import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CourseRepository {
  constructor(@Inject('COURSE_REPO') private courseModel: typeof Course) {}
  async getAllCourse(limit: number, offset: number) {
    try {
      const getAll = await this.courseModel.findAll({ limit, offset });
      if (getAll.length == 0) {
        throw new NotFoundException('Courses not found');
      }
      return {
        msg: 'All courses',
        courses: getAll,
      };
    } catch (error) {
      return error;
    }
  }
  async getCourseById(id: number) {
    try {
      const getOne = await this.courseModel.findByPk(id);
      if (!getOne) {
        throw new NotFoundException('Course not found');
      }
      return { msg: 'Course', course: getOne };
    } catch (error) {
      return error;
    }
  }
  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      await this.courseModel.create({ ...createCourseDto });
      return {
        msg: 'New Course created',
      };
    } catch (error) {
      return error;
    }
  }
  async updateCourseById(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const updateCourse = await this.courseModel.findByPk(id);
      if (!updateCourse) {
        throw new NotFoundException('Course not found');
      }
      await this.courseModel.update(
        { ...updateCourseDto },
        { where: { id: id } },
      );
      return {
        msg: 'Course updated',
      };
    } catch (error) {
      return error;
    }
  }
  async deleteCourseById(id: number) {
    try {
      const data = await this.courseModel.findByPk(id);
      if (!data) {
        throw new NotFoundException('Course not found');
      }
      await this.courseModel.destroy({ where: { id: id } });
      return {
        msg: 'Course deleted',
        deletedCourseId: id,
      };
    } catch (error) {
      return error;
    }
  }
}
