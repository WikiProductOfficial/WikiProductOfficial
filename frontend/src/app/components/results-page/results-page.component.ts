import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDataViewComponent } from './products-data-view/products-data-view.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginatorModule } from 'primeng/paginator';
import { SearchService } from '../../services/search.service';
import { ButtonModule } from 'primeng/button';

interface FilteredProducts {
  minPrice?: number;
  maxPrice?: number;
  stores?: number[];
}
@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [FiltersComponent, ButtonModule],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
  imports: [ProductsDataViewComponent, FiltersComponent, PaginatorModule],
})
export class ResultsPageComponent implements OnInit {
  // Query fields
  query: WritableSignal<string> = signal('');
  page: WritableSignal<string> = signal('1');
  // Results of the query
  results: any;
  maxPages!: number;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    effect(() => {
      console.log(this.page());
    });
  }
  onPageChange(event: any) {
    this.page.set(event.page + 1);
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query.set(params.get('q') || '');
      this.page.set(params.get('page') || '1');
      this.searchService
        .getProducts(this.query(), this.page())
        .subscribe((data) => {
          this.results = data.results;
          this.maxPages = data.max_pages;
        });
    });
  }
}
export class ResultsPageComponent {
  isFiltersVisible: boolean = false;
  filteredProducts: FilteredProducts | undefined;
  onVisibilityChange(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }

  onProductFilterChange(filteredProducts: FilteredProducts) {
    // Construct the query parameters string
    let queryParams = '';

    if (filteredProducts.minPrice !== undefined) {
      queryParams += `minPrice=${filteredProducts.minPrice}&`;
    }

    if (filteredProducts.maxPrice !== undefined) {
      queryParams += `maxPrice=${filteredProducts.maxPrice}&`;
    }

    if (
      filteredProducts.stores !== undefined &&
      filteredProducts.stores.length > 0
    ) {
      queryParams += `stores=${filteredProducts.stores.join(',')}&`;
    }

    if (queryParams.endsWith('&')) {
      queryParams = queryParams.slice(0, -1);
    }

    // Navigate to the same route with query parameters
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams ? { filter: queryParams } : {},
      queryParamsHandling: 'merge',
    });
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
}
