import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorCode: string = '';
  private errorMessage: string = '';

  constructor() {}

  setError(code: string, message: string) {
    this.errorCode = code;
    this.errorMessage = message;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
