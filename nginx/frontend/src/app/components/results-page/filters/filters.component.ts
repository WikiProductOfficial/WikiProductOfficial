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
  @Input() minPrice: number | undefined = undefined;
  @Input() maxPrice: number | undefined = undefined;

  constructor(
    private storeService: StoreService,
    protected screenService: ScreenService
  ) {}

  ngOnInit() {
    // get stores
    this.storeService.getStores().subscribe((stores: Store[]) => {
      this.stores = stores;
    });
  }
  onApply() {
    // init query
    const filteredProducts: FilteredProducts = {};
    filteredProducts.minPrice = this.minPrice;
    filteredProducts.maxPrice = this.maxPrice;
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
