import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = `${window.location.protocol}//${window.location.hostname}:${environment.backendPort}${environment.backendPath}`;
  }

  getProducts(query: string): Observable<any> {
    return this.http
      .get<any>(`${this.backendUrl}/search/?query=${query}`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error.error);
          return throwError(
            () =>
              new Error('Failed to load JSON data; see console for details.')
          );
        })
      );
  }
}