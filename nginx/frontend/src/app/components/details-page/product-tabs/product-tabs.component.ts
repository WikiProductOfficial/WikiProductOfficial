import { Component, Input, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [FormsModule, RatingModule, TabViewModule, CommonModule],
  templateUrl: './product-tabs.component.html',
  styleUrl: './product-tabs.component.scss',
})
export class ProductTabsComponent implements OnInit {
  @Input() product!: Product;
  details: any = {};
  detailKeys: string[] = [];

  ngOnInit(): void {
    this.parseProductDetails();
  }

  private parseProductDetails(): void {
    this.details = this.product.details;
    this.detailKeys = Object.keys(this.details);
  }
}
