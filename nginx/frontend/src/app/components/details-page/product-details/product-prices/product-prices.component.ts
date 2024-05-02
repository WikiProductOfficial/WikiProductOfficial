import { Component, Input } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product.model';
import { CurrencyConversionPipe } from '../../../../pipes/currency-conversion.pipe';
import { WishlistService } from '../../../../services/wishlist.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-prices',
  standalone: true,
  imports: [
    TabViewModule,
    ButtonModule,
    CommonModule,
    CurrencyConversionPipe,
    ToastModule,
  ],
  templateUrl: './product-prices.component.html',
  styleUrl: './product-prices.component.scss',
  providers: [MessageService],
})
export class ProductPricesComponent {
  //providers
  @Input() product!: Product;

  constructor(
    protected wishlistService: WishlistService,
    private messageService: MessageService
  ) {}
  visit(url: string): void {
    window.open(url, '_blank');
  }
  addToWishlist(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Added To The Wishlist',
      detail: `${this.product.name} has been added to the wishlist.`,
    });
    this.wishlistService.addToWishlist(this.product.item_id);
  }
  removeFromWishlist(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Removed From The Wishlist',
      detail: `${this.product.name} has been removed from the wishlist.`,
    });
    this.wishlistService.removeFromWishlist(this.product.item_id);
  }
}
