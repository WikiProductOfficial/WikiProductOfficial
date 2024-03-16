import { Component } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductTabsComponent } from './product-tabs/product-tabs.component';
import { RelatedProductsComponent } from './related-products/related-products.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ProductDetailsComponent,
    ProductTabsComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {}
