import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateCourseDto } from '../../course/dto/update-course.dto';

@Injectable()
export class GroupRepository {
  constructor(@Inject('GROUP_REPO') private groupModel: typeof Group) {}
  async getAllGroup(limit: number, offset: number) {
    try {
      const getAll = await this.groupModel.findAll({ offset, limit });
      if (getAll.length == 0) {
        throw new NotFoundException('Groups not found');
      }
      return { msg: 'All Groups', data: getAll };
    } catch (error) {
      return error;
    }
  }
  async getGroupById(id: number) {
    try {
      const find = await this.groupModel.findByPk(id);
      if (!find) {
        throw new NotFoundException('Group not found');
      }
      return {
        msg: 'Group',
        data: find,
      };
    } catch (error) {
      return error;
    }
  }
  async createGroup(createGroupDto: CreateGroupDto) {
    try {
      await this.groupModel.create({ ...createGroupDto });
      return {
        message: 'Group created',
      };
    } catch (error) {
      return error;
    }
  }
  async updateGroupById(id: number, updateGroupDto: UpdateCourseDto) {
    try {
      const find = await this.groupModel.findByPk(id);
      if (!find) {
        throw new NotFoundException('Group not found');
      }
      await this.groupModel.update(updateGroupDto, { where: { id: id } });
      return {
        msg: 'Group updated',
        updatedGroupId: id,
      };
    } catch (error) {
      return error;
    }
  }
  async deleteGroupById(id: number) {
    try {
      const find = await this.groupModel.findOne({ where: { id: id } });
      if (!find) {
        throw new NotFoundException('groups');
      }
      await this.groupModel.destroy({ where: { id: id } });
      return {
        msg: 'Group deleted',
        deletedGroup: id,
      };
    } catch (error) {
      return error;
    }
  }
}
