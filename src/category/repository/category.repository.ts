import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @Inject('CATEGORY_REPO') private categoryModel: typeof Category,
  ) {}
  async getAllCategory(limit: number, offset: number) {
    try {
      const getAll = await this.categoryModel.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });
      if (getAll.length == 0) {
        throw new NotFoundException('Categories not found');
      }
      return {
        msg: 'All categories',
        allCategories: getAll,
      };
    } catch (error) {
      return error;
    }
  }
  async getCategoryById(id: number) {
    try {
      const getById = await this.categoryModel.findOne({ where: { id: id } });
      if (!getById) {
        throw new NotFoundException('Category not found');
      }
      return {
        message: 'Category',
        category: getById,
      };
    } catch (error) {
      return error;
    }
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      await this.categoryModel.create({
        ...createCategoryDto,
      });
      return {
        msg: 'Category Created',
      };
    } catch (error) {
      return error;
    }
  }
  async updateCategoryById(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const getCategory = await this.categoryModel.findOne({
        where: { id: id },
      });
      if (!getCategory) {
        throw new NotFoundException('Category not found');
      }
      await this.categoryModel.update(updateCategoryDto, { where: { id: id } });
      return {
        msg: 'Category Updated',
        updatedCategoryId: id,
      };
    } catch (error) {
      return error;
    }
  }
  async deleteCategoryById(id: number) {
    try {
      const find = await this.categoryModel.findOne({ where: { id: id } });
      if (!find) {
        throw new NotFoundException('Category not found');
      }
      await this.categoryModel.destroy({ where: { id: id } });
      return {
        msg: 'Category deleted',
        deletedCategoryId: id,
      };
    } catch (error) {
      return error;
    }
  }
}
