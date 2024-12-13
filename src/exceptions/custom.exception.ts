import { HttpException, HttpStatus } from '@nestjs/common';

export class MyCustomException extends HttpException {
  constructor(
    message: string,
    private readonly date: Date,
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    console.log({ date });
  }
}
