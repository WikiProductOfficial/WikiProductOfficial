import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-products-data-view',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    LoaderComponent,
  ],
  templateUrl: './products-data-view.component.html',
  styleUrl: './products-data-view.component.scss',
})
export class ProductsDataViewComponent {
  @Input() products!: any[];
  layout: 'list' | 'grid' = 'list';

  // will used for spinner 'loading variable'
  constructor(public searchService: SearchService) {}
}
