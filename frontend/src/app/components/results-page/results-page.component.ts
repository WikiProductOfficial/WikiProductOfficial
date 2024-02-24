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
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onProductFilterChange(filteredProducts: FilteredProducts) {
    // update roate
    this.filteredProducts = filteredProducts;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: filteredProducts,
    });
    console.log(filteredProducts);
  }
}
