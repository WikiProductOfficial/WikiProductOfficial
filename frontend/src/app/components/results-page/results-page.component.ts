import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';

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
})
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
