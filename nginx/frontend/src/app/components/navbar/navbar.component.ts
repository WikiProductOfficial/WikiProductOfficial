import { Component, HostListener, OnInit, effect, signal } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { CookieService } from 'ngx-cookie-service';
import { TreeModule } from 'primeng/tree';
import { take } from 'rxjs/operators';

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
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyService } from '../../services/currency.service';
import { TreeNode } from 'primeng/api/treenode';
import { SearchService } from '../../services/search.service';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SidebarModule,
    TreeModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    TooltipModule,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
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

  countries = ['SAR', 'USD'];
  selectedCountry = this.countries[0];
  treeNodes: TreeNode[] = [];

  constructor(
    private themeService: ThemeService,
    private cookieService: CookieService,
    private categoriesService: CategoriesService,
    private router: Router,
    protected currencyService: CurrencyService,
    private searchService: SearchService
  ) {
    effect(() => {
      this.cookieService.set('theme', JSON.stringify(this.isDarkTheme()));
      this.themeService.toggleToDark(this.isDarkTheme());
    });
  }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.treeNodes = this.createTreeNodes(data);
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
      },
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

  createTreeNodes(data: any[]): TreeNode[] {
    const nodes: { [key: number]: TreeNode } = {};

    data.forEach((item: any) => {
      nodes[item.category_id] = {
        label: item.category,
        data: item.category_id,
        children: [],
      };
    });

    data.forEach((item: any) => {
      if (item.parent) {
        nodes[item.parent].children!.push(nodes[item.category_id]);
      }
    });

    return data
      .filter((item: any) => item.parent === null)
      .map((item: any) => nodes[item.category_id]);
  }

  onCategorySelect(event: any): void {
    this.router.navigate(['/results'], {
      queryParams: { category: event.node.data },
    });
  }
}
