import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDataViewComponent } from './products-data-view/products-data-view.component';

@Component({
  selector: 'app-results-page',
  standalone: true,
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
  imports: [ProductsDataViewComponent],
})
export class ResultsPageComponent implements OnInit {
  query!: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.query = this.route.snapshot.queryParamMap.get('q') || '';
  }
}
