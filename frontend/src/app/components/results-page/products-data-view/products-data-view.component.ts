import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-data-view',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    ButtonModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './products-data-view.component.html',
  styleUrl: './products-data-view.component.scss',
})
export class ProductsDataViewComponent {
  @Input() products!: any[];
  layout: 'list' | 'grid' = 'grid';
}
