import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

interface Store {
  id: number;
  name: string;
}

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
  selectedStores: Store[] = [];
  stores: Store[] = [];
  minPrice: number = 0;
  maxPrice: number = 1000; // will be replaced later with max product price
  showFilters: boolean = true;
  isLargeScreen: boolean = true;

  ngOnInit() {
    // retrive price range & stores, it will be mocked initially till integration

    this.getStores().then((stores) => {
      this.stores = stores;
    });
  }
  onApply() {
    // create filter object or fill it
    const filteredProducts: FilteredProducts = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      stores: this.selectedStores.map((store) => store.id),
    };
    // emit to parent
    this.filteredProductsChange.emit(filteredProducts);
  }

  onReset() {
    // reset selections to default
    this.selectedStores = [];
    this.minPrice = 0;
    this.maxPrice = 1000;
    // here will emit empty queries, so that no filter needed.
    this.filteredProductsChange.emit({});
  }

  getStores(): Promise<Store[]> {
    return new Promise((resolve) => {
      // service will be used here
      setTimeout(() => {
        resolve([
          { name: 'Amazon', id: 1 },
          { name: 'Noon', id: 2 },
          { name: 'Jarir', id: 3 },
          { name: 'Extra', id: 4 },
        ]);
      }, 1000); // error test
    });
  }
}
