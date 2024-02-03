import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleToDark(isDarkTheme: Boolean) {
    if (this.document) {
      let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
      let theme = isDarkTheme ? 'custom-dark-theme' : 'custom-light-theme';

      if (themeLink) {
        themeLink.href = theme + '.css';
      }
    }
  }
}
