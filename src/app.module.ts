import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://khkhamidullo:qwer1234@cluster0.rgtrd.mongodb.net/',
    ),
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log(consumer);
    consumer.apply(LoggerMiddleware).forRoutes('user');
    // consumer
    // .apply(LoggerMiddleware)
    // .exclude(
    // { path: 'us*r', method: RequestMethod.GET },
    // { path: 'user', method: RequestMethod.POST },
    // 'user/(.*)',
    // )
    // .forRoutes({
    //   path: 'us*r',
    //   method: RequestMethod.ALL,
    // });
    // .forRoutes(UserController);
    // consumer.apply(LoggerMiddleware).forRoutes(UserController);
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   // path: 'user',
    //   path: 'us*r',
    //   method: RequestMethod.GET,
    // });
    // throw new Error('Method not implemented.');
  }
}
