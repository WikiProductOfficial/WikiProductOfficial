import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    let url = `${environment.backendUrl}/stores/`;
    return this.http.get<Store[]>(url).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Failed to load JSON data; see console for details.')
        );
      })
    );
  }
}
