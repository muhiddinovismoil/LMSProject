import { Inject, Injectable } from '@nestjs/common';
import { Group } from '../entities/group.entity';

@Injectable()
export class GroupRepository {
  constructor(@Inject('GROUP_REPO') private groupModel: typeof Group) {}
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
