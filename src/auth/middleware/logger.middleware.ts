import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log({
      url: req.url,
      method: req.method,
      headers: req.headers,
    });

    console.log('Request...');
    next();
  }
}
