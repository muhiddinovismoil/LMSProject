import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupRepository } from './repository/group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}
  async create(createGroupDto: CreateGroupDto) {
    try {
      return await this.groupRepository.createGroup(createGroupDto);
    } catch (error) {
      return error;
    }
  }
  async findAll(limit: number, offset: number) {
    try {
      return await this.groupRepository.getAllGroup(limit, offset);
    } catch (error) {
      return error;
    }
  }
  async findOne(id: number) {
    try {
      return await this.groupRepository.getGroupById(id);
    } catch (error) {
      return error;
    }
  }
  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      return await this.groupRepository.updateGroupById(id, updateGroupDto);
    } catch (error) {
      return error;
    }
  }
  async remove(id: number) {
    try {
      return await this.groupRepository.deleteGroupById(id);
    } catch (error) {
      return error;
    }
  }
}
