import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StoreService } from '../../../services/store.service';
import { Store } from '../../../models/store.model';
import { ScreenService } from '../../../services/screen.service';
import { CurrencyService } from '../../../services/currency.service';
import { Filters } from '../../../models/filters.model';

interface FilteredProducts {
  minPrice?: number;
  maxPrice?: number;
  stores?: number[];
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    CheckboxModule,
    CommonModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibilityChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  // for filter process
  @Output() filteredProductsChange: EventEmitter<FilteredProducts> =
    new EventEmitter<FilteredProducts>();
  // set initial values
  @Input() stores: Store[] = [];
  @Input() selectedStores: Store[] = [];
  @Input() filters!: Filters;
  @Input() minPrice: number | undefined = undefined;
  @Input() maxPrice: number | undefined = undefined;

  constructor(
    private storeService: StoreService,
    protected screenService: ScreenService,
    protected currencyService: CurrencyService
  ) {}

  ngOnInit() {
    // get stores
    this.storeService.getStores().subscribe((stores: Store[]) => {
      this.stores = stores;
      //match current filter(stores need to be inside subscribtion), if there is any.
      if (this.filters) {
        var idsArray =
          this.filters.stores?.split(',').map(function (item) {
            return parseInt(item);
          }) ?? [];
        this.selectedStores = stores.filter(function (obj) {
          return idsArray.includes(obj.store_id);
        });
      }
    });
    //match current filter(prices), if there is any.
    if (this.filters) {
      this.minPrice = this.currencyService.convertToUserCurrency(
        this.filters.minPrice ?? 0
      );
      this.maxPrice = this.currencyService.convertToUserCurrency(
        this.filters.maxPrice ?? 0
      );
    }
  }
  onApply() {
    // init query
    const filteredProducts: FilteredProducts = {};
    filteredProducts.minPrice = this.currencyService.convertToDollar(
      this.minPrice ?? 0
    );
    filteredProducts.maxPrice = this.currencyService.convertToDollar(
      this.maxPrice ?? 0
    );
    // Add selected stores filter if any stores are selected
    if (this.selectedStores && this.selectedStores.length > 0) {
      filteredProducts.stores = this.selectedStores.map(
        (store) => store.store_id
      );
    }
    // Emit filteredProducts
    this.filteredProductsChange.emit(filteredProducts);
  }
}
