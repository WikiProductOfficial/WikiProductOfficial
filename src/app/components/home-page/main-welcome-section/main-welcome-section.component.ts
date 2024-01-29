import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-welcome-section',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './main-welcome-section.component.html',
  styleUrl: './main-welcome-section.component.scss',
})
export class MainWelcomeSectionComponent {
  openBotPopUp(): void {
    window.location.href = 'https://bard.google.com/';
  }
}
