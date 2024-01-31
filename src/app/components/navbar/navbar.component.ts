import { Component, HostListener } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

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
