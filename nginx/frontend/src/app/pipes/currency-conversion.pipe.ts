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
    const formattedValue = convertedValue.toFixed(2);
    return formattedValue + ' ' + this.currencyService.userCurrency;
  }
}
