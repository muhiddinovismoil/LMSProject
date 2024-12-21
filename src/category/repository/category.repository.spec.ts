import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from '../entities/category.entity';
import { Model } from 'sequelize';

describe('CategoryRepository', () => {
  let categoryRepository: CategoryRepository;
  let mockCategoryModel: Partial<typeof Category>;

  const mockCategory = {
    id: 1,
    name: 'Category 1',
    description: 'Description 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    // Sequelize model properties
    toJSON: jest.fn().mockReturnValue({
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    }),
    dataValues: {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    },
  } as unknown as Model;

  const mockCategories = [
    mockCategory,
    {
      ...mockCategory,
      id: 2,
      name: 'Category 2',
      toJSON: jest.fn().mockReturnValue({
        id: 2,
        name: 'Category 2',
        description: 'Description 2',
      }),
      dataValues: {
        id: 2,
        name: 'Category 2',
        description: 'Description 2',
      },
    },
  ] as unknown as Model[];

  beforeEach(async () => {
    mockCategoryModel = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
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
    it('should return all categories', async () => {
      jest
        .spyOn(mockCategoryModel, 'findAll')
        .mockResolvedValue(mockCategories);

      const result = await categoryRepository.getAllCategory(10, 0);

      expect(mockCategoryModel.findAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        order: [['createdAt', 'DESC']],
      });
      expect(result).toEqual({
        msg: 'All categories',
        allCategories: mockCategories,
      });
    });

    it('should throw NotFoundException if no categories are found', async () => {
      jest.spyOn(mockCategoryModel, 'findAll').mockResolvedValue([]);

      await expect(categoryRepository.getAllCategory(10, 0)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by ID', async () => {
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValue(mockCategory);

      const result = await categoryRepository.getCategoryById(1);

      expect(mockCategoryModel.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({
        message: 'Category',
        category: mockCategory,
      });
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValue(null);

      await expect(categoryRepository.getCategoryById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const createCategoryDto = {
        name: 'Category 1',
        description: 'Description 1',
      };
      jest.spyOn(mockCategoryModel, 'create').mockResolvedValue(mockCategory);

      const result = await categoryRepository.createCategory(createCategoryDto);

      expect(mockCategoryModel.create).toHaveBeenCalledWith(createCategoryDto);
      expect(result).toEqual({
        msg: 'Category Created',
        categoryId: mockCategory.id,
      });
    });
  });

  describe('updateCategoryById', () => {
    it('should update a category by ID', async () => {
      const updateCategoryDto = {
        name: 'Updated Category',
        description: 'Updated Description',
      };
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValue(mockCategory);
      jest.spyOn(mockCategoryModel, 'update').mockResolvedValue([1]);

      const result = await categoryRepository.updateCategoryById(
        1,
        updateCategoryDto,
      );

      expect(mockCategoryModel.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockCategoryModel.update).toHaveBeenCalledWith(updateCategoryDto, {
        where: { id: 1 },
      });
      expect(result).toEqual({
        msg: 'Category Updated',
        updatedCategoryId: 1,
      });
    });

    it('should throw NotFoundException if category is not found', async () => {
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValue(null);

      await expect(
        categoryRepository.updateCategoryById(1, { name: 'Updated Category' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCategoryById', () => {
    it('should delete a category by ID', async () => {
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValue(mockCategory);
      jest.spyOn(mockCategoryModel, 'destroy').mockResolvedValue(1);

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

    it('should throw NotFoundException if category is not found', async () => {
      jest.spyOn(mockCategoryModel, 'findOne').mockResolvedValue(null);

      await expect(categoryRepository.deleteCategoryById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
