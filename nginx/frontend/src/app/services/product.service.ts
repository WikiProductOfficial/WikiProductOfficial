import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, finalize, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  loading: boolean = false;
  getDetailedProduct(productId: number): Observable<Product> {
    this.loading = true;
    let url = `${environment.backendUrl}/items/${productId}/`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        this.loading = false;
        return throwError(
          () => new Error('Failed to load JSON data; see console for details.')
        );
      }),
      finalize(() => {
        this.loading = false; // loading is finished, remove spinner
      })
    );
  }
}
