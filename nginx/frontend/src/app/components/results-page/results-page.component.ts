import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
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
import { CategoriesService } from '../../services/categories.service';

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
  category: WritableSignal<string> = signal('');
  categoryName: WritableSignal<string> = signal('');

  // filler component inputs and outputs
  isFiltersVisible: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    protected categoriesService: CategoriesService
  ) {
    effect(() => {
      // If category id changed, then chagne get the new name.
      this.categoriesService
        .getCategory(this.category())
        .subscribe((category) => {
          this.categoryName.set(category.category);
        });
    });
  }
  // Convert Page to number (Used in paginator).
  getPageNumber() {
    return parseInt(this.page());
  }
  // Visibility of filters Modal.
  onVisibilityChange(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }
  onShowFiltersClicked(event: any) {
    this.isFiltersVisible = true;
  }
  // Function to update filters.
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
  // Function to update Page.
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
  // Function to handle sort selection.
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
      this.category.set(params.get('category') || '');
      this.filters.set({
        minPrice: parseFloat(params.get('minPrice') || '0'),
        maxPrice: parseFloat(params.get('maxPrice') || '0'),
        stores: params.get('stores') ?? '',
      });

      this.searchService
        .getProducts(
          this.query(),
          this.page(),
          this.sort(),
          this.filters(),
          this.category()
        )
        .subscribe((data) => {
          this.results = data.results;
          this.maxPages = data.max_pages;
        });
    });
  }
}
