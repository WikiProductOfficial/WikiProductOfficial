import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [FiltersComponent],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
})
export class ResultsPageComponent {
  isFiltersVisible: boolean = false;
  onVisibilityChange(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }
}
