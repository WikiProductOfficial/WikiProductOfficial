import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { ProductService } from '../../../services/product.service';
import { RelatedProduct } from '../../../models/details-page-models/related-product.model';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [RatingModule, CarouselModule, FormsModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent {
  @Input() relatedProducts!: RelatedProduct[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
