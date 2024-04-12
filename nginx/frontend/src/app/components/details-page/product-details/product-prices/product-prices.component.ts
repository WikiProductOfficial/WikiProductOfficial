import { Component, Input } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product.model';
import { CurrencyConversionPipe } from '../../../../pipes/currency-conversion.pipe';

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

  visit(url: string): void {
    window.open(url, '_blank');
  }
}
