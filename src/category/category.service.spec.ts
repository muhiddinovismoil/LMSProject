import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: Partial<CategoryRepository>;

  beforeEach(async () => {
    categoryRepository = {
      getCategoryById: jest.fn(),
      getAllCategory: jest.fn(),
      createCategory: jest.fn(),
      updateCategoryById: jest.fn(),
      deleteCategoryById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CategoryRepository, useValue: categoryRepository },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should create a category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'New Category',
      description: 'New Category Description',
    };
    const mockCategory = {
      ...createCategoryDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    jest
      .spyOn(categoryRepository, 'createCategory')
      .mockResolvedValue(mockCategory);

    const result = await categoryService.create(createCategoryDto);
    expect(categoryRepository.createCategory).toHaveBeenCalledWith(
      createCategoryDto,
    );
    expect(result).toEqual(mockCategory);
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories = [
        {
          id: 1,
          name: 'Category 1',
          description: 'Category 1 Description',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'Category 2',
          description: 'Category 2 Description',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      jest.spyOn(categoryRepository, 'getAllCategory').mockResolvedValue({
        msg: 'All categories',
        allCategories: categories,
      });

      const result = await categoryService.findAll(10, 0);
      expect(categoryRepository.getAllCategory).toHaveBeenCalledWith(10, 0);
      expect(result).toEqual({
        msg: 'All categories',
        allCategories: categories,
      });
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const category = {
        id: 1,
        name: 'Category 1',
        description: 'Category 1 Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest
        .spyOn(categoryRepository, 'getCategoryById')
        .mockResolvedValue({ message: 'Category', category });

      const result = await categoryService.findOne(1);
      expect(categoryRepository.getCategoryById).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Category', category });
    });
  });

  describe('update', () => {
    it('should update a category by id', async () => {
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Category',
        description: 'Updated Category Description',
      };

      jest
        .spyOn(categoryRepository, 'updateCategoryById')
        .mockResolvedValue({ msg: 'Category Updated', updatedCategoryId: 1 });

      const result = await categoryService.update(1, updateCategoryDto);
      expect(categoryRepository.updateCategoryById).toHaveBeenCalledWith(
        1,
        updateCategoryDto,
      );
      expect(result).toEqual({ msg: 'Category Updated', updatedCategoryId: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a category by id', async () => {
      const categoryId = 1;

      jest.spyOn(categoryRepository, 'deleteCategoryById').mockResolvedValue({
        msg: 'Category Deleted',
        deletedCategoryId: categoryId,
      });

      const result = await categoryService.remove(categoryId);
      expect(categoryRepository.deleteCategoryById).toHaveBeenCalledWith(
        categoryId,
      );
      expect(result).toEqual({
        msg: 'Category Deleted',
        deletedCategoryId: categoryId,
      });
    });
  });
});
