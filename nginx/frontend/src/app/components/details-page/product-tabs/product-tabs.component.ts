import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ProductService } from '../../../services/product.service';
import { ProductTabs } from '../../../models/product-tabs.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [TabViewModule, CommonModule],
  templateUrl: './product-tabs.component.html',
  styleUrl: './product-tabs.component.scss',
})
export class ProductTabsComponent {
  tabs: ProductTabs[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.tabs = this.productService.getProductTabs();
    console.log(this.tabs[0]['header']);
  }
}
