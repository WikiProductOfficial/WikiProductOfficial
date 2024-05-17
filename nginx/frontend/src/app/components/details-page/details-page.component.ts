import { Component } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductTabsComponent } from './product-tabs/product-tabs.component';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { ProductService } from '../../services/product.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';

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
  detailedProduct!: Product;
  relatedProducts!: any;

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getDetailedProduct(+productId).subscribe({
          next: (data) => {
            this.detailedProduct = data;
            this.productService
              .getRelatedProducts(data.item_id.toString())
              .subscribe(
                (data) => {
                  this.relatedProducts = data;
                  console.log(this.relatedProducts);
                },
                (error) => {
                  console.error(error);
                }
              );
          },
          error: (error) => {
            console.error('Error fetching detailed product:', error);
          },
        });
      }
    });
  }
}
