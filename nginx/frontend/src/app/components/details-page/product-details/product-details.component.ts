import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ProductService } from '../../../services/product.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ProviderInfo } from '../../../models/providerInfo.model';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    GalleriaModule,
    RatingModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  //gallery
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  //description
  description: any | undefined;
  rateValue!: number;

  //providers
  providers: ProviderInfo[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getImages().then((images) => (this.images = images));
    this.productService
      .getDescription()
      .then(
        (description) => (
          (this.description = description),
          (this.rateValue = this.description.rating)
        )
      );
    this.providers = this.productService.getProviderData();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 4,
      },
      {
        breakpoint: '560px',
        numVisible: 3,
      },
    ];
  }

  visit(url: string): void {
    window.open(url, '_blank');
  }
}
