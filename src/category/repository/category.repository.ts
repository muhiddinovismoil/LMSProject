import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class GroupRepository {
  constructor(
    @Inject('CATEGORY_REPO') private categoryModel: typeof Category,
  ) {}
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
