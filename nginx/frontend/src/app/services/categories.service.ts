import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environment.backendUrl}/categories/`;
  constructor(private http: HttpClient) {}
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('An error occurred:', error.message);
        return throwError(
          () => new Error('Failed to load categories; see console for details.')
        );
      })
    );
  }
  getCategory(category_id: string): Observable<any> {
    const apiUrl = `${environment.backendUrl}/category/?category=${category_id}`;
    return this.http.get<any>(apiUrl).pipe(
      catchError((error) => {
        console.error('An error occurred:', error.message);
        return throwError(
          () => new Error('Failed to load categories; see console for details.')
        );
      })
    );
  }
}
