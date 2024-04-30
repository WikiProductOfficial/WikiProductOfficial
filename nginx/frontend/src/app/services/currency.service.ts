import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // Assume default currency is SAR
  private _userCurrency: string = 'SAR';
  conversionRates: { [key: string]: number } = {
    USD: 1,
    SAR: 3.75,
  };

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

  convertToDollar(amount: number): number {
    // Convert amount to dollar
    console.log(amount / this.conversionRates[this.userCurrency]);
    return amount / this.conversionRates[this.userCurrency];
  }

  convertToUserCurrency(amount: number): number {
    // Convert amount to user's currency
    return amount * this.conversionRates[this.userCurrency];
  }
}
