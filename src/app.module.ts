import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [DatabaseModule, UserModule, BlogModule],
})
export class AppModule {}
