// import { Test, TestingModule } from '@nestjs/testing';
// import { CategoryService } from './category.service';
// import { CategoryRepository } from './repository/category.repository';
// import { NotFoundException } from '@nestjs/common';

// describe('CategoryService', () => {
//   let categoryService: CategoryService;
//   let categoryRepository: Partial<CategoryRepository>;

//   beforeEach(async () => {
//     categoryRepository = {
//       getCategoryById: jest.fn(),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CategoryService,
//         { provide: CategoryRepository, useValue: categoryRepository },
//       ],
//     }).compile();

//     categoryService = module.get<CategoryService>(CategoryService);
//   });

//   describe('getCategoryById', () => {
//     it('should return a category by id', async () => {
//       const category = {
//         id: 1,
//         name: 'Category 1',
//         description: 'Description for Category 1',
//       };

//       jest
//         .spyOn(categoryRepository, 'getCategoryById')
//         .mockResolvedValue(category);

//       const result = await categoryService.getCategoryById(1);

//       expect(categoryRepository.getCategoryById).toHaveBeenCalledWith(1);
//       expect(result).toEqual(category);
//     });

//     it('should throw NotFoundException if category is not found', async () => {
//       jest
//         .spyOn(categoryRepository, 'getCategoryById')
//         .mockRejectedValue(new NotFoundException('Category not found'));

//       await expect(categoryService.getCategoryById(1)).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });
// });
