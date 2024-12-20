import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.createCategory(createCategoryDto);
    } catch (error) {
      return error;
    }
  }

  async findAll(limit: number, offset: number) {
    try {
      return await this.categoryRepository.getAllCategory(limit, offset);
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoryRepository.getCategoryById(id);
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.updateCategoryById(
        id,
        updateCategoryDto,
      );
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      return await this.categoryRepository.deleteCategoryById(id);
    } catch (error) {
      return error;
    }
  }
}
