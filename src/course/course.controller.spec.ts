import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;
  const mockCourseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
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
      controllers: [CourseController],
      providers: [{ provide: CourseService, useValue: mockCourseService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();
    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should call the service with correct data and return the result', async () => {
      const dto = {
        name: 'New Course',
        description: 'About course',
        category_id: 1,
      };
      const mockResult = {
        msg: 'New Course created',
        courseId: 1,
      };
      mockCourseService.create.mockResolvedValue(mockResult);
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
          name: 'Course 1',
          description: 'Description of Course 1',
          category_id: 1,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResult);
      const result = await controller.findAll(10, 0);
      expect(service.findAll).toHaveBeenCalledWith(10, 0);
      expect(result).toEqual(mockResult);
    });
  });
  describe('findOne', () => {
    it('should call the service with correct id and return the result', async () => {
      const mockResult = {
        id: 1,
        name: 'Course 1',
        description: 'Description of Course 1',
        category_id: 1,
      };
      mockCourseService.findOne.mockResolvedValue(mockResult);
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
  describe('update', () => {
    it('should call the service with correct id and return updated result', async () => {
      const dto = {
        name: 'Updated Course',
      };
      const mockResult = {
        id: 1,
        ...dto,
      };
      mockCourseService.update.mockResolvedValue(mockResult);
      const result = await controller.update('1', dto);
      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockResult);
    });
  });
  describe('remove', () => {
    it('should call the service with correct id and return the result', async () => {
      const mockResult = {
        message: 'Course deleted successfully',
      };
      mockCourseService.remove.mockResolvedValue(mockResult);
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
});
