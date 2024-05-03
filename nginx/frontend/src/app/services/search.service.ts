import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Filters } from '../models/filters.model';
import { ProductsCollection } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  loading: boolean = false;

  getProducts(
    query: string,
    page: string,
    sort: string | undefined,
    fillers: Filters,
    categoryId?: string
  ): Observable<ProductsCollection> {
    this.loading = true;
    let url = `${environment.backendUrl}/search/?`;

    if (query) {
      url += `query=${query}&`;
    }

    if (page) {
      url += `page=${page}&`;
    }

    if (sort) {
      url += `sort=${sort}&`;
    }

    if (fillers.minPrice) {
      url += `min_price=${fillers.minPrice}&`;
    }

    if (fillers.maxPrice) {
      url += `max_price=${fillers.maxPrice}&`;
    }

    if (fillers.stores) {
      url += `stores=${fillers.stores}&`;
    }

    if (categoryId) {
      url += `category=${categoryId}&`;
    }

    return this.http.get<any>(url).pipe(
      catchError(async () => new ProductsCollection([])), // Catch error and return empty collection
      finalize(() => {
        this.loading = false; // loading is finished, remove spinner
      })
    );
  }
}
