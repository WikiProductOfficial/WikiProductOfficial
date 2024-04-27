import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { CurrencyConversionPipe } from '../../pipes/currency-conversion.pipe';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss',
  imports: [
    DataViewModule,
    CommonModule,
    RatingModule,
    FormsModule,
    CurrencyConversionPipe,
    LoaderComponent,
  ],
})
export class WishlistPageComponent implements OnInit {
  products: any[] | undefined;
  temp: any[] | undefined;
  layout: 'list' | 'grid' = 'grid';

  constructor(
    private router: Router,
    protected wishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.wishlistService.postWishlist().subscribe((products: any) => {
      this.products = products;
    });
  }
  onProductClicked(productId: number) {
    this.router.navigate(['/details', productId]);
  }
}
