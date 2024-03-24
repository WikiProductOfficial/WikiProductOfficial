import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-describe',
  standalone: true,
  imports: [RatingModule, CommonModule, FormsModule],
  templateUrl: './product-describe.component.html',
  styleUrl: './product-describe.component.scss',
})
export class ProductDescribeComponent {
  //description
  @Input() product!: Product;
  rateValue!: number;

  ngOnInit() {
    this.rateValue = this.product.rating;
  }
}
