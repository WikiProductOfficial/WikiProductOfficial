import { Component, OnInit } from '@angular/core';
import { MainWelcomeSectionComponent } from './main-welcome-section/main-welcome-section.component';
import { CardModule } from 'primeng/card';
import { MainFeaturesSectionComponent } from './main-features-section/main-features-section.component';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FeaturedProductsSectionComponent } from './featured-products-section/featured-products-section.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [
    MainWelcomeSectionComponent,
    CardModule,
    MainFeaturesSectionComponent,
    AnimateOnScrollModule,
    FeaturedProductsSectionComponent,
  ],
})
export class HomePageComponent implements OnInit {
  scrollup() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  ngOnInit(): void {
    this.scrollup();
  }
}
