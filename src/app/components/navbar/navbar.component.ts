import { Component, HostListener, OnInit, effect, signal } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CategoriesService } from '../../services/categories.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    TooltipModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  sidebarVisible: boolean = false;
  navbarScrolled: boolean = false;
  isLargeScreen: boolean = false;
  categories!: string[];
  isDarkTheme = signal(this.cookieService.get('theme') === 'true');
  value: any;

  constructor(
    private themeService: ThemeService,
    private cookieService: CookieService,
    private categoriesService: CategoriesService
  ) {
    effect(() => {
      this.cookieService.set('theme', JSON.stringify(this.isDarkTheme()));
      this.themeService.toggleToDark(this.isDarkTheme());
    });
  }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data.categories;
    });
    this.checkScreenSize();
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
    this.isLargeScreen = window.innerWidth >= 1024;
  }
  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
