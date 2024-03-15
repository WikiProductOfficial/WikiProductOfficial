import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  loading: boolean = false;

  getProducts(query: string, page: string): Observable<any> {
    this.loading = true;
    return this.http
      .get<any>(`${environment.backendUrl}/search/?query=${query}&page=${page}`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error.error);
          return throwError(
            () =>
              new Error('Failed to load JSON data; see console for details.')
          );
        }),
        finalize(() => {
          this.loading = false; // loading is finished, remove spinner
        })
      );
  }
}
