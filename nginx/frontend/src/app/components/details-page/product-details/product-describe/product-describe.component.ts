import { Component } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-describe',
  standalone: true,
  imports: [RatingModule, CommonModule, FormsModule],
  templateUrl: './product-describe.component.html',
  styleUrl: './product-describe.component.scss',
})
export class ProductDescribeComponent {
  //description
  description!: any;
  rateValue!: number;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getDescription()
      .then(
        (description) => (
          (this.description = description),
          (this.rateValue = this.description.rating)
        )
      );
  }
}
