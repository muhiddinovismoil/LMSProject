import { Inject, Injectable } from '@nestjs/common';
import { Course } from '../entities/course.entity';

@Injectable()
export class GroupRepository {
  constructor(@Inject('COURSE_REPO') private courseModel: typeof Course) {}
  async getAllGroup(params: type) {
    try {
    } catch (error) {
      return error;
    }
  }
  async getGroupById(params: type) {
    try {
    } catch (error) {
      return error;
    }
  }
  async createGroup(params: type) {
    try {
    } catch (error) {
      return error;
    }
  }
  async updateGroupById(params: type) {
    try {
    } catch (error) {
      return error;
    }
  }
  async deleteGroupById(params: type) {
    try {
    } catch (error) {
      return error;
    }
  }
}
