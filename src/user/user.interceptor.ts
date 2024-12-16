import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  logger: Logger = new Logger(UserInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    this.logger.log(`Incoming Request: ${req.method}, ${req.url}`);
    // const now = Date.now();

    const params = req.params;
    req.params['id'] = parseInt(params.id) + 1;
    this.logger.log({ params });

    // response time calculation
    // return next
    //   .handle()
    //   .pipe(
    //     tap(() => this.logger.log(`Outging Response: ${Date.now() - now}`)),
    //   );

    //  add new data to request
    return next
      .handle()
      .pipe(map((data) => ({ ...data, timestamp: new Date() })));
  }
}

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  logger: Logger = new Logger(UserInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        this.logger.log(`An Error occured: ${err.message}`);
        return throwError(new HttpException(err.message, 500));
      }),
    );
  }
}
