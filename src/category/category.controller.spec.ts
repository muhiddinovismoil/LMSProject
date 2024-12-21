import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  const mockCategoryService = {
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
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();
    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should call the service with correct data and return the result', async () => {
      const dto = { name: 'New Category', description: 'category data' };
      const mockResult = { ...dto };
      mockCategoryService.create.mockResolvedValue(mockResult);
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });
  });
  describe('findAll', () => {
    it('should call the service with limit and offset and return the result', async () => {
      const mockResult = [{ id: 1, name: 'Category 1' }];
      mockCategoryService.findAll.mockResolvedValue(mockResult);
      const result = await controller.findAll(10, 0);
      expect(service.findAll).toHaveBeenCalledWith(10, 0);
      expect(result).toEqual(mockResult);
    });
  });
  describe('findOne', () => {
    it('should call the service with correct id and return the result', async () => {
      const mockResult = { id: 1, name: 'Category 1' };
      mockCategoryService.findOne.mockResolvedValue(mockResult);
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
  describe('update', () => {
    it('should call the service with correct id and data and return the result', async () => {
      const dto = { name: 'Updated Category' };
      const mockResult = { id: 1, ...dto };
      mockCategoryService.update.mockResolvedValue(mockResult);
      const result = await controller.update('1', dto);
      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockResult);
    });
  });
  describe('remove', () => {
    it('should call the service with correct id and return the result', async () => {
      const mockResult = { message: 'Category deleted successfully' };
      mockCategoryService.remove.mockResolvedValue(mockResult);
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
});
