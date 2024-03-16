import { Component } from '@angular/core';
import { ProviderInfo } from '../../../../models/providerInfo.model';
import { ProductService } from '../../../../services/product.service';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-prices',
  standalone: true,
  imports: [TabViewModule, ButtonModule, CommonModule],
  templateUrl: './product-prices.component.html',
  styleUrl: './product-prices.component.scss',
})
export class ProductPricesComponent {
  //providers
  providers: ProviderInfo[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.providers = this.productService.getProviderData();
  }

  visit(url: string): void {
    window.open(url, '_blank');
  }
}
