import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDataViewComponent } from './products-data-view/products-data-view.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-results-page',
  standalone: true,
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
  imports: [ProductsDataViewComponent, FiltersComponent],
})
export class ResultsPageComponent implements OnInit {
  query!: string;
  results: any;
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}
  ngOnInit(): void {
    this.query = this.route.snapshot.queryParamMap.get('q') || '';
    this.searchService.getProducts(this.query).subscribe(
      (data) => {
        this.results = data;
        console.log(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
