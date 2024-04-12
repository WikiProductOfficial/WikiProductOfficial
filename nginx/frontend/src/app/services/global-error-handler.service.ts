import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService, private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);
    let errorCode = '404';
    let errorMessage =
      'Oops! it seems that you are trying to access a page that does not exist';
    console.error(error);
    if (error instanceof HttpErrorResponse) {
      router.navigateByUrl('/404', { skipLocationChange: true });
    } else {
      errorCode = '505';
      errorMessage = 'The server could not load the products';
      router.navigateByUrl('/505', { skipLocationChange: true });
    }
    this.errorService.setError(errorCode, errorMessage);
  }
}
