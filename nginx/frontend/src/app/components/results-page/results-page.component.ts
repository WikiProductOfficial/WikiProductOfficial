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
import { Filters } from '../../models/filters';

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
  filters: WritableSignal<Filters> = signal({});
  results: any;
  maxPages!: number;
  // filler component inputs and outputs
  isFiltersVisible: boolean = false;
  onVisibilityChange(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }

  onProductFilterChange(filteredProducts: any) {
    //Remove old filters
    this.filters.set({});
    // Add new filters
    if (filteredProducts.minPrice) {
      this.filters().minPrice = filteredProducts.minPrice;
    }
    if (filteredProducts.maxPrice) {
      this.filters().maxPrice = filteredProducts.maxPrice;
    }
    if (filteredProducts.stores) {
      const storesString = filteredProducts.stores.join(',');
      this.filters().stores = storesString;
    }
    // Navigate to the same route with query parameters
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        q: this.query(),
        page: this.page(),
        sort: this.sort(),
        minPrice: this.filters().minPrice,
        maxPrice: this.filters().maxPrice,
        stores: this.filters().stores,
      },
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
  onSortOptionSelected(sortOption: string) {
    this.sort.set(sortOption);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { sort: this.sort() },
      queryParamsHandling: 'merge',
    });
  }
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.query.set(params.get('q') || '');
      this.page.set(params.get('page') || '1');
      this.sort.set(params.get('sort') || undefined);
      // TODO: Parse the filters from the query params.

      this.searchService
        .getProducts(this.query(), this.page(), this.sort(), this.filters())
        .subscribe((data) => {
          this.results = data.results;
          this.maxPages = data.max_pages;
        });
    });
  }
}
