import { Component, Input } from '@angular/core';
import { ProviderInfo } from '../../../../models/details-page-models/providerInfo.model';
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
  @Input() product!: any;

  visit(url: string): void {
    window.open(url, '_blank');
  }
}
