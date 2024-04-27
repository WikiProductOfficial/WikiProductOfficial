import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'currencyConversion',
  standalone: true,
  pure: false,
})
export class CurrencyConversionPipe implements PipeTransform {
  constructor(private currencyService: CurrencyService) {}

  transform(value: number): string {
    return (
      this.currencyService.convertToUserCurrency(value) +
      ' ' +
      this.currencyService.userCurrency
    );
  }
}
