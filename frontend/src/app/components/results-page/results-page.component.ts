import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [FiltersComponent, ButtonModule],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
})
export class ResultsPageComponent {
  isFiltersVisible: boolean = false;
  onVisibilityChange(isVisible: boolean) {
    this.isFiltersVisible = isVisible;
  }
}
