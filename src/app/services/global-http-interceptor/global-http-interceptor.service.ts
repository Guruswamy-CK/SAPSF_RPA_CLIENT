import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CommonStorageService } from '../common-storage/common-storage.service';

@Injectable({ providedIn: 'root' })
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(private commonService: CommonStorageService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        this.commonService.openSnackBarFailure(error.message+'. '+'Please connect to technical support team.');
        return of(error);
      }),
    );
  }
}
