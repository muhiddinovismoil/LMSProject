import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [UserModule, AuthModule, CatModule],
})
export class AppModule {}
