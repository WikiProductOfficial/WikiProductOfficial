import { Component } from '@angular/core';
import { MainWelcomeSectionComponent } from './main-welcome-section/main-welcome-section.component';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MainWelcomeSectionComponent, CardModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
