import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/ http-exception.filter';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  // app.useGlobalGuards(RoleGuard);
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();
