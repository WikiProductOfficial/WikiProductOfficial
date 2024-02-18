import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

//TODO: adjust show filter button
//TODO: send queries parameters on apply
//TODO: clean code & push
//TODO: Tree Component situation

interface Store {
  id: number;
  name: string;
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
  // set initial values
  selectedStores: Store[] = [];
  stores: Store[] = [];
  minPrice: number = 20;
  maxPrice: number = 80;
  showFilters: boolean = true;
  isLargeScreen: boolean = true;

  ngOnInit() {
    // retrive price range & stores, it will be mocked initially till integration

    this.getStores().then((stores) => {
      this.stores = stores;
    });
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
