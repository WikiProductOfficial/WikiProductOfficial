import { Component, HostListener, effect, signal } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  sidebarVisible: boolean = false;
  navbarScrolled: boolean = false;
  isDarkTheme = signal(this.cookieService.get('theme') === 'true');

  constructor(
    private themeService: ThemeService,
    private cookieService: CookieService
  ) {
    effect(() => {
      this.cookieService.set('theme', JSON.stringify(this.isDarkTheme()));
      this.themeService.toggleToDark(this.isDarkTheme());
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.navbarScrolled = scrollOffset > 0;
  }

  checkScreenSize() {
    if (this.sidebarVisible) {
      this.sidebarVisible = window.innerWidth < 768;
    }
  }
  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
