import { Component, Input } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ProductService } from '../../../services/product.service';
import { ProductTabs } from '../../../models/details-page-models/product-tabs.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [TabViewModule, CommonModule],
  templateUrl: './product-tabs.component.html',
  styleUrl: './product-tabs.component.scss',
})
export class ProductTabsComponent {
  @Input() tabs!: ProductTabs[];
}
