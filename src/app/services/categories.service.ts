import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>('/assets/mock/categories.json').pipe(
      catchError((error) => {
        console.error('An error occurred:', error.error);
        return throwError(
          () => new Error('Failed to load JSON data; see console for details.')
        );
      })
    );
  }
}
