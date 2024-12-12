import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://khkhamidullo:qwer1234@cluster0.rgtrd.mongodb.net/',
    ),
  ],
})
export class AppModule {}
