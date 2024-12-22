import { Test, TestingModule } from '@nestjs/testing';
import { GroupRepository } from './group.repository';
import { Group } from '../entities/group.entity';
describe('GroupRepository', () => {
  let groupRepository: GroupRepository;
  let mockGroupModel: Partial<typeof Group>;
  beforeEach(async () => {
    mockGroupModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupRepository,
        { provide: 'GROUP_REPO', useValue: mockGroupModel },
      ],
    }).compile();
    groupRepository = module.get<GroupRepository>(GroupRepository);
  });
  describe('getAllGroup', () => {
    it('should return all groups with pagination', async () => {
      const courses = [
        {
          id: 1,
          name: 'Group 1',
          description: 'Description for Group 1',
          course_id: 1,
          price: 1990000,
          room: 'Google',
          students: ['student 1', 'student 2', 'student 3'],
          teacher: 'Teacher',
          start_date: new Date('2024-12-22 15:00:00+05'),
          end_date: new Date('2024-12-22 17:00:00+05'),
        },
      ];
      const mockResolveData = {
        msg: 'All Groups',
        data: courses,
      };
      (mockGroupModel.findAll as jest.Mock).mockResolvedValue(courses);
      const result = await groupRepository.getAllGroup(10, 0);
      expect(mockGroupModel.findAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });
      expect(result).toEqual(mockResolveData);
    });
  });
  describe('getGroupById', () => {
    it('should return group by id', async () => {
      const mockGroupData = {
        id: 1,
        name: 'Group 1',
        description: 'Description for Group 1',
        course_id: 1,
        price: 1990000,
        room: 'Google',
        students: ['student 1', 'student 2', 'student 3'],
        teacher: 'Teacher',
        start_date: new Date('2024-12-22 15:00:00+05'),
        end_date: new Date('2024-12-22 17:00:00+05'),
      };
      const mockResolveData = { msg: 'Group', data: mockGroupData };
      (mockGroupModel.findByPk as jest.Mock).mockResolvedValue(mockGroupData);
      const result = await groupRepository.getGroupById(1);
      expect(mockGroupModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResolveData);
    });
  });
  describe('createGroup', () => {
    it('should create group', async () => {
      const mockGroup = {
        id: 1,
        name: 'Group 1',
        description: 'Description for Group 1',
        course_id: 1,
        price: 1990000,
        room: 'Google',
        students: ['student 1', 'student 2', 'student 3'],
        teacher: 'Teacher',
        start_date: new Date('2024-12-22 15:00:00+05'),
        end_date: new Date('2024-12-22 17:00:00+05'),
      };
      const mockResolveData = {
        message: 'Group created',
      };
      (mockGroupModel.create as jest.Mock).mockResolvedValue(mockGroup);
      const result = await groupRepository.createGroup(mockGroup);
      expect(mockGroupModel.create).toHaveBeenCalledWith(mockGroup);
      expect(result).toEqual(mockResolveData);
    });
  });
  describe('updateGroupById', () => {
    it('should update group by id', async () => {
      const mockUpdateGroup = {
        name: 'Updated Group 1',
        description: 'Updated Group description',
      };
      const mockGroup = {
        id: 1,
        name: 'Group 1',
        description: 'Description for Group 1',
        course_id: 1,
        price: 1990000,
        room: 'Google',
        students: ['student 1', 'student 2', 'student 3'],
        teacher: 'Teacher',
        start_date: new Date('2024-12-22 15:00:00+05'),
        end_date: new Date('2024-12-22 17:00:00+05'),
      };
      (mockGroupModel.findByPk as jest.Mock).mockResolvedValue(mockGroup);
      (mockGroupModel.update as jest.Mock).mockResolvedValue([1]);
      const result = await groupRepository.updateGroupById(1, mockUpdateGroup);
      expect(mockGroupModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockGroupModel.update).toHaveBeenCalledWith(mockUpdateGroup, {
        where: { id: 1 },
      });
      expect(result).toEqual({
        msg: 'Group updated',
        updatedGroupId: 1,
      });
    });
  });
  describe('deleteGroupById', () => {
    it('should update group by id', async () => {});
  });
});
