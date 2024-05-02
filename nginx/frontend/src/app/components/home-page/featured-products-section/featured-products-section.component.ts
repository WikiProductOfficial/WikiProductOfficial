import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { CurrencyConversionPipe } from '../../../pipes/currency-conversion.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-products-section',
  standalone: true,
  templateUrl: './featured-products-section.component.html',
  styleUrl: './featured-products-section.component.scss',
  imports: [
    RatingModule,
    CarouselModule,
    FormsModule,
    LoaderComponent,
    CurrencyConversionPipe,
  ],
})
export class FeaturedProductsSectionComponent implements OnInit {
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
  featuredProducts!: Product[];

  constructor(
    protected productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productService.getPopularProducts().subscribe((data) => {
      this.featuredProducts = data;
    });
    console.log(this.featuredProducts);
  }
  onProductClicked(productId: number) {
    this.router.navigate(['/details', productId]);
  }

  // TODO: Do a function that take you to results page.
}
