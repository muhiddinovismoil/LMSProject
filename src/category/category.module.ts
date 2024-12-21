import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repository';
import { DatabaseModule } from '../database/database.module';
import { categoryProvider } from './category.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryRepository, ...categoryProvider, CategoryService],
  exports: [CategoryRepository],
})
export class CategoryModule {}
