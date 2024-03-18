import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  imports: [
    FiltersComponent,
    ButtonModule,
    ProductsDataViewComponent,
    FiltersComponent,
    PaginatorModule,
  ],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
})
export class ResultsPageComponent implements OnInit {
  // Query fields
  query: WritableSignal<string> = signal('');
  page: WritableSignal<string> = signal('1');
  sort: WritableSignal<string | undefined> = signal(undefined);

  // Results of the query
  results: any;
  maxPages!: number;
  // filler component inputs and outputs
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}
  onPageChange(event: any) {
    this.page.set(event.page + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page() },
      queryParamsHandling: 'merge',
    });
  }
  onSortOptionSelected(event: any) {
    this.sort.set(event);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { sort: event },
      queryParamsHandling: 'merge',
    });
  }
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.query.set(params.get('q') || '');
      this.page.set(params.get('page') || '1');
      this.sort.set(params.get('sort') || undefined);

      this.searchService
        .getProducts(this.query(), this.page(), this.sort())
        .subscribe((data) => {
          this.results = data.results;
          this.maxPages = data.max_pages;
        });
    });
  }
}
