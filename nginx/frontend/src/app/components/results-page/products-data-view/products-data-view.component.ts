import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { DropdownModule } from 'primeng/dropdown';

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
    DropdownModule,
  ],
})
export class ProductsDataViewComponent {
  constructor(protected searchService: SearchService) {}
  @Input() products!: any[];
  @Input() selectedSortOption!: string | undefined;
  @Output() sortOptionSelected = new EventEmitter<string>();
  layout: 'list' | 'grid' = 'grid';
  sortOptions = [
    {
      label: 'Price: Lowest first',
      value: 'pa',
      icon: 'pi pi-sort-amount-down-alt',
    },
    {
      label: 'Price: Highest first',
      value: 'pd',
      icon: 'pi pi-sort-amount-down',
    },
    { label: 'Name: A to Z', value: 'na', icon: 'pi pi-sort-alpha-down' },
    { label: 'Name: Z to A', value: 'nd', icon: 'pi pi-sort-alpha-down-alt' },
    {
      label: 'Highest Rating',
      value: 'rd',
      icon: 'pi pi-star',
    },
  ];

  onSortOptionChange() {
    if (this.selectedSortOption) {
      this.sortOptionSelected.emit(this.selectedSortOption);
    }
  }

  onProductClicked(productId: number) {
    console.log('product clicked', productId);
    // Add your code here to handle the product click event
  }
}
