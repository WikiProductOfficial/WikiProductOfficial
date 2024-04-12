import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // Assume default currency is USD
  private _userCurrency: string = 'SAR';

  get userCurrency(): string {
    return this._userCurrency;
  }

  set userCurrency(currency: string) {
    this._userCurrency = currency;
  }

  constructor() {}

  setUserCurrency(currency: string) {
    this._userCurrency = currency;
  }

  convertToUserCurrency(amount: number): number {
    // Conversion rates - example rates for demonstration purposes
    const conversionRates: { [key: string]: number } = {
      USD: 1, // 1 USD = 1 USD
      SAR: 3.75, // 1 USD = 3.75 SAR (example conversion rate)
    };

    // Convert amount to user's currency
    return amount * conversionRates[this.userCurrency];
  }
}
