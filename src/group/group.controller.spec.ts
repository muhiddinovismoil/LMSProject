import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;
  const mockGroupService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };
  const mockRoleGuard = {
    canActivate: jest.fn(() => true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [{ provide: GroupService, useValue: mockGroupService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();
    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should call the service with correct data and return the result', async () => {
      const dto = {
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
      const mockResult = {
        message: 'Group created',
      };
      mockGroupService.create.mockResolvedValue(mockResult);
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });
  });
  describe('findAll', () => {
    it('should call the service with limit and offset and return the result', async () => {
      const mockResult = [
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
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResult);
      const result = await controller.findAll(10, 0);
      expect(service.findAll).toHaveBeenCalledWith(10, 0);
      expect(result).toEqual(mockResult);
    });
  });
  describe('findOne', () => {
    it('should call the service and should return a group', async () => {
      const mockResult = {
        msg: 'Group',
        data: {
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
      };
      mockGroupService.findOne.mockResolvedValue(mockResult);
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
  describe('update', () => {
    it('', async () => {
      const dto = {
        name: 'Updated Group 1',
        description: 'Group for development',
      };
      const mockResult = {
        id: 1,
        ...dto,
      };
      mockGroupService.update.mockResolvedValue(mockResult);
      const result = await controller.update('1', dto);
      expect(mockGroupService.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockResult);
    });
  });
  describe('remove', () => {
    it('should call the service and delete the group', async () => {
      const mockResult = {
        msg: 'Group deleted',
        deletedGroup: 1,
      };
      mockGroupService.remove.mockResolvedValue(mockResult);
      const result = await controller.remove('1');
      expect(mockGroupService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
});
