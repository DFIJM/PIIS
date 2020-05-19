import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpAppInterceptor implements HttpInterceptor {
  constructor(private httpService: HttpService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpService.show();
    return next.handle(request).pipe(finalize(() => this.httpService.hide()));
  }
}
