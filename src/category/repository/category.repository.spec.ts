import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from './category.repository';
import { Category } from '../entities/category.entity';
describe('CategoryRepository', () => {
  let categoryRepository: CategoryRepository;
  let mockCategoryModel: Partial<typeof Category>;
  beforeEach(async () => {
    mockCategoryModel = {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryRepository,
        { provide: 'CATEGORY_REPO', useValue: mockCategoryModel },
      ],
    }).compile();
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });
  describe('getAllCategory', () => {
    it('should return all categories with pagination', async () => {
      const categories = [
        {
          id: 1,
          name: 'Category 1',
          description: 'Description for Category 1',
          createdAt: new Date('2024-01-01T08:00:00.000Z'),
          updatedAt: new Date('2024-12-21T10:00:00.000Z'),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'Category 2',
          description: 'Description for Category 2',
          createdAt: new Date('2024-01-02T08:00:00.000Z'),
          updatedAt: new Date('2024-12-22T10:00:00.000Z'),
          deletedAt: null,
        },
      ];
      (mockCategoryModel.findAll as jest.Mock).mockResolvedValue(categories);
      const result = await categoryRepository.getAllCategory(2, 0);
      expect(mockCategoryModel.findAll).toHaveBeenCalledWith({
        limit: 2,
        offset: 0,
        order: [['createdAt', 'DESC']],
      });
      expect(result).toEqual({
        msg: 'All categories',
        allCategories: categories,
      });
    });
    describe('getCategoryById', () => {
      it('should return a category by id', async () => {
        const category = {
          id: 1,
          name: 'Category 1',
          description: 'Description for Category 1',
          createdAt: new Date('2024-01-01T08:00:00.000Z'),
          updatedAt: new Date('2024-12-21T10:00:00.000Z'),
          deletedAt: null,
        };
        (mockCategoryModel.findOne as jest.Mock).mockResolvedValue(category);
        const result = await categoryRepository.getCategoryById(1);
        expect(mockCategoryModel.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
        });
        expect(result).toEqual({
          message: 'Category',
          category,
        });
      });
    });
    describe('createCategory', () => {
      it('should create a category', async () => {
        const mockCategory = {
          name: 'New Category',
          description: 'New Category Description',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        (mockCategoryModel.create as jest.Mock).mockResolvedValue(mockCategory);
        const result = await categoryRepository.createCategory(mockCategory);
        expect(mockCategoryModel.create).toHaveBeenCalled();
        expect(result).toEqual({
          msg: 'Category Created',
        });
      });
    });
    describe('updateCategoryById', () => {
      it('should update category by id', async () => {
        const mockUpdateData = {
          name: 'Updated',
          description: 'Success',
          updatedAt: new Date(),
        };
        const mockCategory = {
          id: 1,
          name: 'Old Category',
          description: 'Old Description',
          createdAt: new Date('2024-01-01T08:00:00.000Z'),
          updatedAt: new Date('2024-12-21T10:00:00.000Z'),
          deletedAt: null,
        };
        (mockCategoryModel.findOne as jest.Mock).mockResolvedValue(
          mockCategory,
        );
        (mockCategoryModel.update as jest.Mock).mockResolvedValue([1]);
        const result = await categoryRepository.updateCategoryById(
          1,
          mockUpdateData,
        );
        expect(mockCategoryModel.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
        });
        expect(mockCategoryModel.update).toHaveBeenCalledWith(mockUpdateData, {
          where: { id: 1 },
        });
        expect(result).toEqual({
          msg: 'Category Updated',
          updatedCategoryId: 1,
        });
      });
    });
    describe('deleteCategoryById', () => {
      it('should delete category by id', async () => {
        const mockResultData = {
          msg: 'Category deleted',
          id: 1,
        };
        const mockCategory = {
          id: 1,
          name: 'Old Category',
          description: 'Old Description',
          createdAt: new Date('2024-01-01T08:00:00.000Z'),
          updatedAt: new Date('2024-12-21T10:00:00.000Z'),
          deletedAt: null,
        };
        (mockCategoryModel.findOne as jest.Mock).mockResolvedValue(
          mockCategory,
        );
        (mockCategoryModel.destroy as jest.Mock).mockResolvedValue(
          mockResultData,
        );
        const result = await categoryRepository.deleteCategoryById(1);
        expect(mockCategoryModel.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
        });
        expect(mockCategoryModel.destroy).toHaveBeenCalledWith({
          where: { id: 1 },
        });
        expect(result).toEqual({
          msg: 'Category deleted',
          deletedCategoryId: 1,
        });
      });
    });
  });
});
