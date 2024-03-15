import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-products-data-view',
  standalone: true,
  templateUrl: './products-data-view.component.html',
  styleUrl: './products-data-view.component.scss',
  imports: [
    DataViewModule,
    CommonModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    LoaderComponent,
  ],
})
export class ProductsDataViewComponent {
  constructor(public searchService: SearchService) {}
  @Input() products!: any[];
  layout: 'list' | 'grid' = 'grid';
}
