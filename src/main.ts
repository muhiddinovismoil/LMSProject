import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(RoleGuard);
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();

// class Logger {
//   log(name: string) {
//     console.log(`Hello ${name}`);
//   }
// }

// class MyLogger {
//   log(name: string) {
//     console.log(`ASSSALOMU ALAYKUM ${name}`);
//   }
// }

// class Greet {
//   constructor(private readonly logger: Logger) {}

//   sayHi(name: string) {
//     this.logger.log(name);
//   }
// }

// const greet = new Greet(new MyLogger());

// greet.sayHi('Sobitjon');

// interface IPaymentService {}

// class ClickPaymentService implements IPaymentService {}
// class PaymePaymentService implements IPaymentService {}

// class Payment {
//   constructor(private readonly paymentService: IPaymentService) {}
//   pay() {}
// }

// const payment = new Payment(new ClickPaymentService());
// const payment2 = new Payment(new PaymePaymentService());

// payment.pay();
// payment2.pay();
