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
    const convertedValue = this.currencyService.convertToUserCurrency(value);
    // format the number with comma and taking only two decimals example (10,000.00)
    const formattedValue = convertedValue
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue + ' ' + this.currencyService.userCurrency;
  }
}
