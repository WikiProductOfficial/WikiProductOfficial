import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { CurrencyConversionPipe } from '../../../pipes/currency-conversion.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [
    RatingModule,
    CarouselModule,
    FormsModule,
    LoaderComponent,
    CurrencyConversionPipe,
  ],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent implements OnInit, OnDestroy {
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
  @Input() relatedProducts!: Product[];
  private routeSubscription: Subscription | undefined;

  constructor(
    protected productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onProductClicked(productId: number) {
    this.router.navigate(['/details', productId]);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
