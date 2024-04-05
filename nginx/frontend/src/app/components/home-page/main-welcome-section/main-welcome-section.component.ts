import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Blob } from '../../../models/ui-models/blob.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { Observable, map, scan } from 'rxjs';
import { Message } from '../../../models/message.model';
import { ChatbotService } from '../../../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-main-welcome-section',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    DividerModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './main-welcome-section.component.html',
  styleUrl: './main-welcome-section.component.scss',
  animations: [
    trigger('fadeoutup', [
      transition(':leave', [
        animate(
          '0.3s ease-out',
          style({ opacity: 0, transform: 'translateY(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class MainWelcomeSectionComponent implements OnInit {
  messages: Observable<Message[]> = new Observable<Message[]>();
  formValue: string = '';
  isEmpty: boolean = true;
  isLoading: boolean = false;
  isFirstMessage: boolean = false;

  constructor(private chat: ChatbotService) {}
  ngOnInit(): void {
    this.animateBlobs();
    this.messages = this.chat.conversation
      .asObservable()
      .pipe(scan((acc, value) => acc.concat(value)));
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

  //Chatbot operaitons
  updateIsEmpty() {
    this.isEmpty = this.formValue === '';
  }

  checkResponse() {
    this.messages
      .pipe(map((messages) => messages[messages.length - 1]))
      .subscribe((lastMessage) => {
        if (lastMessage.sentBy === 'bot') {
          this.isLoading = false;
        } else {
          this.isLoading = true;
        }
      });
    return this.isLoading;
  }

  sendMessage() {
    if (!this.isEmpty) {
      this.chat.converse(this.formValue);
      this.formValue = '';
      this.isEmpty = true;
      this.isFirstMessage = true;
      this.checkResponse();
    }
  }
}
