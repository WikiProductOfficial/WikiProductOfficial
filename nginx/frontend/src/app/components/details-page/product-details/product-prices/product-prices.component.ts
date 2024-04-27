import { Component, Input } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product.model';
import { CurrencyConversionPipe } from '../../../../pipes/currency-conversion.pipe';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WishlistService } from '../../../../services/wishlist.service';

@Component({
  selector: 'app-product-prices',
  standalone: true,
  imports: [TabViewModule, ButtonModule, CommonModule, CurrencyConversionPipe],
  templateUrl: './product-prices.component.html',
  styleUrl: './product-prices.component.scss',
})
export class ProductPricesComponent {
  //providers
  @Input() product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    protected wishlistService: WishlistService
  ) {}
  visit(url: string): void {
    window.open(url, '_blank');
  }
  addToWishlist(): void {
    this.wishlistService.addToWishlist(this.product.item_id);
  }
  removeFromWishlist(): void {
    this.wishlistService.removeFromWishlist(this.product.item_id);
  }
}
