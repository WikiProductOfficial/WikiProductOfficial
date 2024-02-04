import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Blob } from '../../../models/ui-models/blob.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-main-welcome-section',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
  ],
  templateUrl: './main-welcome-section.component.html',
  styleUrl: './main-welcome-section.component.scss',
})
export class MainWelcomeSectionComponent implements OnInit {
  ngOnInit(): void {
    this.animateBlobs();
  }
  openBotPopUp(): void {
    window.location.href = 'https://bard.google.com/';
  }
  private posX: number = 0;
  private posY: number = 0;
  private speed: number = 0.2;

  animateBlobs() {
    const blobsEls = document.querySelectorAll('.blob');
    const blobs = Array.from(blobsEls).map((blobEl) => new Blob(blobEl));

    function update() {
      blobs.forEach((blob) => {
        blob.update();
        blob.move();
      });
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    // Apply new position
    // circle.style.left = `${this.posX}px`;
    // circle.style.top = `${this.posY}px`;

    // Check if the circle reached the bottom right
    // Assuming a viewport of 800x600 for simplicity
  }
}
