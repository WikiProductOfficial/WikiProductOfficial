import { Component, Input } from '@angular/core';

import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { CommonModule } from '@angular/common';
import { ProductDescribeComponent } from './product-describe/product-describe.component';
import { ProductPricesComponent } from './product-prices/product-prices.component';
import { DetailedProduct } from '../../../models/details-page-models/detailed-product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    ProductGalleryComponent,
    CommonModule,
    ProductDescribeComponent,
    ProductPricesComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  @Input() product!: DetailedProduct;
}
