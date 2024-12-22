import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { GroupRepository } from './repository/group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
describe('GroupService', () => {
  let groupService: GroupService;
  let groupRepository: GroupRepository;
  beforeEach(async () => {
    const mockGroupRepository = {
      getAllGroup: jest.fn(),
      getGroupById: jest.fn(),
      createGroup: jest.fn(),
      updateGroupById: jest.fn(),
      deleteGroupById: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: GroupRepository, useValue: mockGroupRepository },
      ],
    }).compile();

    groupService = module.get<GroupService>(GroupService);
    groupRepository = module.get<GroupRepository>(GroupRepository);
  });
  it('should create a group', async () => {
    const createGroupDto: CreateGroupDto = {
      name: 'Group 1',
      description: 'Description for Group 1',
      course_id: 1,
      price: 1990000,
      room: 'Google',
      students: ['student 1', 'student 2', 'student 3'],
      teacher: 'Teacher',
      start_date: new Date(),
      end_date: new Date(),
    };
    jest
      .spyOn(groupRepository, 'createGroup')
      .mockResolvedValue(createGroupDto);
    const result = await groupService.create(createGroupDto);
    expect(groupRepository.createGroup).toHaveBeenCalledWith(createGroupDto);
    expect(result).toEqual(createGroupDto);
  });
  describe('findAll', () => {
    it('should get all groups', async () => {
      const groups = [
        {
          id: 1,
          name: 'Group 1',
          description: 'Description for Group 1',
          course_id: 1,
          price: 1990000,
          room: 'Google',
          students: ['student 1', 'student 2', 'student 3'],
          teacher: 'Teacher',
          start_date: new Date(),
          end_date: new Date(),
        },
      ];
      const mockResolve = {
        msg: 'All Groups',
        data: groups,
      };
      jest.spyOn(groupRepository, 'getAllGroup').mockResolvedValue(mockResolve);
      const result = await groupService.findAll(10, 0);
      expect(groupRepository.getAllGroup).toHaveBeenCalledWith(10, 0);
      expect(result).toEqual(mockResolve);
    });
  });
  describe('findOne', () => {
    it('should get a group', async () => {
      const course = {
        id: 1,
        name: 'Group 1',
        description: 'Description for Group 1',
        course_id: 1,
        price: 1990000,
        room: 'Google',
        students: ['student 1', 'student 2', 'student 3'],
        teacher: 'Teacher',
        start_date: new Date(),
        end_date: new Date(),
      };
      const mockResolve = { msg: 'Course', course: course };
      jest
        .spyOn(groupRepository, 'getGroupById')
        .mockResolvedValue(mockResolve);
      const result = await groupService.findOne(1);
      expect(groupRepository.getGroupById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResolve);
    });
  });
  describe('update', () => {
    it('should update group by id', async () => {
      const updateGroupDto: UpdateGroupDto = {
        name: 'Group Updated',
        description: 'Group description updated',
      };
      const mockResolve = {
        msg: 'Group updated',
        updatedGroupId: 1,
      };
      jest
        .spyOn(groupRepository, 'updateGroupById')
        .mockResolvedValue(mockResolve);
      const result = await groupService.update(1, updateGroupDto);
      expect(groupRepository.updateGroupById).toHaveBeenCalledWith(
        1,
        updateGroupDto,
      );
      expect(result).toEqual(mockResolve);
    });
  });
  describe('remove', () => {
    it('should delete group by id', async () => {
      const groupId: number = 1;
      const mockResolve = {
        msg: 'Group deleted',
        deletedGroup: groupId,
      };
      jest
        .spyOn(groupRepository, 'deleteGroupById')
        .mockResolvedValue(mockResolve);
      const result = await groupService.remove(groupId);
      expect(groupRepository.deleteGroupById).toHaveBeenCalledWith(groupId);
      expect(result).toEqual(mockResolve);
    });
  });
});
