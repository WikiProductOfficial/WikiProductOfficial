import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyConversionPipe } from '../../../pipes/currency-conversion.pipe';
import { CurrencyService } from '../../../services/currency.service';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-products-data-view',
  standalone: true,
  templateUrl: './products-data-view.component.html',
  styleUrl: './products-data-view.component.scss',
  providers: [CurrencyConversionPipe],
  imports: [
    DataViewModule,
    CommonModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    LoaderComponent,
    DropdownModule,
    CurrencyConversionPipe,
  ],
})
export class ProductsDataViewComponent {
  constructor(
    protected searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    protected currencyService: CurrencyService,
    protected screenService: ScreenService
  ) {}
  @Input() title!: string;
  @Input() products!: any[];
  @Input() selectedSortOption!: string | undefined;
  @Output() sortOptionSelected = new EventEmitter<string>();
  @Output() showFiltersClicked = new EventEmitter<boolean>();

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
    this.router.navigate(['/details', productId]);
  }
  onShowFiltersClicked() {
    this.showFiltersClicked.emit(true);
  }
}
