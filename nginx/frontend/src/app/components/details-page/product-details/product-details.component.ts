import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  //gallery
  images: any[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getImages().then((images) => (this.images = images));
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }

  // Description
}
