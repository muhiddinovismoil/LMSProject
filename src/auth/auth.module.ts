import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      // useValue: new ValidationPipe(),
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('auth');
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'auth/login',
      method: RequestMethod.GET,
    });
  }
}
