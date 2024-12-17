import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { blogProviders } from './blog.provider';

@Module({
  controllers: [BlogController],
  providers: [BlogService, ...blogProviders],
})
export class BlogModule {}
