import { Component, HostListener, OnInit, effect, signal } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { CookieService } from 'ngx-cookie-service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CategoriesService } from '../../services/categories.service';
import { Router, RouterModule } from '@angular/router';

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
    ReactiveFormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  sidebarVisible: boolean = false;
  navbarScrolled: boolean = false;
  isLargeScreen: boolean = false;
  categories!: any[];
  isDarkTheme = signal(this.cookieService.get('theme') === 'true');
  searchForm = new FormGroup({
    query: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private themeService: ThemeService,
    private cookieService: CookieService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    effect(() => {
      this.cookieService.set('theme', JSON.stringify(this.isDarkTheme()));
      this.themeService.toggleToDark(this.isDarkTheme());
    });
  }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
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
  search() {
    if (this.searchForm.valid) {
      this.router.navigate(['/results'], {
        queryParams: { q: this.searchForm.get('query')?.value },
      });
      this.searchForm.reset();
    }
  }
}
