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

@Component({
  selector: 'app-results-page',
  standalone: true,
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
