import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { catchError, finalize, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: Set<number>;
  loading = false;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.wishlist = new Set<number>(
      JSON.parse(this.cookieService.get('wishlist') || '[]')
    );
  }

  addToWishlist(productId: any): void {
    this.wishlist.add(productId);
    this.cookieService.set(
      'wishlist',
      JSON.stringify(Array.from(this.wishlist)),
      { expires: new Date('9999-12-31') } // to prevent cookie from expiring.
    );
    this.wishlist = new Set<number>(
      JSON.parse(this.cookieService.get('wishlist') || '[]')
    );
  }

  removeFromWishlist(productId: any): void {
    this.wishlist.delete(productId);
    this.cookieService.set(
      'wishlist',
      JSON.stringify(Array.from(this.wishlist)),
      { expires: new Date('9999-12-31') }
    );
    this.wishlist = new Set<number>(
      JSON.parse(this.cookieService.get('wishlist') || '[]')
    );
  }

  postWishlist(): any {
    this.loading = true;
    const wishlistData = {
      wishlist: JSON.parse(this.cookieService.get('wishlist') || '[]'),
    };
    console.log(this.wishlist);
    return this.http
      .post(`${environment.backendUrl}/wishlist/`, wishlistData)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('An error occurred:', error.error);
          return throwError(
            () =>
              new Error('Failed to load JSON data; see console for details.')
          );
        }),
        finalize(() => {
          this.loading = false;
        })
      );
  }
}
