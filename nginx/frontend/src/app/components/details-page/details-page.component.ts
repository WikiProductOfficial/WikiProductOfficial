import { Component } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductTabsComponent } from './product-tabs/product-tabs.component';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { ProductService } from '../../services/product.service';
import { DetailedProduct } from '../../models/details-page-models/detailed-product.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ProductDetailsComponent,
    ProductTabsComponent,
    RelatedProductsComponent,
    ProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {
  detailedProduct!: DetailedProduct;
  loading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getDetailedProduct().subscribe({
      next: (data) => {
        this.detailedProduct = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('error!', err);

        this.loading = false;
      },
    });
  }
}
