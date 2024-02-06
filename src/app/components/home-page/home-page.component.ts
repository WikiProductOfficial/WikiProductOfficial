import { Component } from '@angular/core';
import { MainWelcomeSectionComponent } from './main-welcome-section/main-welcome-section.component';
import { CardModule } from 'primeng/card';
import { MainFeaturesSectionComponent } from './main-features-section/main-features-section.component';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
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
  ],
})
export class HomePageComponent {}
