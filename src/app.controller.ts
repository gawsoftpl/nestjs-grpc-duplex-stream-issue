import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { GrpcStreamMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcStreamMethod('RequestsHistoryService', 'Create')
  Create(
    requestStream$,
  ) {
    const subject$ = new Subject();
    const onNext = async (request) => {
      console.log(request)

      try {
        subject$.next({
          request_id: request.request_id,
          success: true,
        });

      } catch (err) {
        console.log(err)
      }
    };

    const onComplete = () => subject$.complete();

    requestStream$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject$.asObservable();
  }


}
