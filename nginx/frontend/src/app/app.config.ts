import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { ErrorService } from './services/error.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideHttpClient(withFetch()),
    //Error handling
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ErrorService,
  ],
};
