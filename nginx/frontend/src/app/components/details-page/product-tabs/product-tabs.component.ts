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
    const detailsString = this.product.details;

    this.details = this.convertDetailsStringToObject(detailsString);
    this.detailKeys = Object.keys(this.details);
  }

  private convertDetailsStringToObject(detailsString: string): any {
    const object: any = {};

    const keyValuePairs = detailsString.replace(/['{}]/g, '').split(', ');
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(/:(.+)/);
      if (key && value) {
        object[key.trim()] = value.trim();
      }
    });
    return object;
  }
}
