import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { RatingModule } from 'primeng/rating';
import { CurrencyConversionPipe } from '../../../pipes/currency-conversion.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-welcome-section',
  standalone: true,
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
  imports: [
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    DividerModule,
    CommonModule,
    FormsModule,
    RatingModule,
    CurrencyConversionPipe,
  ],
})
export class MainWelcomeSectionComponent implements OnInit, OnDestroy {
  private posX: number = 0;
  private posY: number = 0;
  private speed: number = 0.2;

  @ViewChild('messageContainer') messageContainer!: ElementRef;
  messages: Observable<Message[]> = new Observable<Message[]>();
  formValue: string = '';
  isEmpty: boolean = true;
  isLoading: boolean = false;
  dotsCount: number = 1;
  isFirstMessage: boolean = false;

  //Mock number of products
  // Define an array with four elements
  productMessages: any[] = [1, 2];

  constructor(private chat: ChatbotService, private router: Router) {}
  ngOnInit(): void {
    this.chat.clearConversation();
    this.animateBlobs();
    this.messages = this.chat.conversation
      .asObservable()
      .pipe(scan((acc, value) => acc.concat(value)));

    this.subscribeToNewMessages();
    this.updateDotsCount();
  }

  ngOnDestroy() {
    this.chat.clearConversation();
  }

  updateDotsCount() {
    setInterval(() => {
      this.dotsCount = (this.dotsCount % 3) + 1;
    }, 1000);
  }

  subscribeToNewMessages() {
    this.messages.subscribe((messages) => {
      const initialMessageCount = this.chat.conversation.value.length;
      const currentMessageCount = messages.length;
      if (currentMessageCount > initialMessageCount) {
        setTimeout(() => {
          this.scrollMessageContainerToBottom();
        }, 100);
      }
    });
  }

  private scrollMessageContainerToBottom() {
    this.messageContainer.nativeElement.scrollTo({
      top: this.messageContainer.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

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

  isMarkdown(content: string): boolean {
    return (
      content.includes('*') || content.includes('_') || content.includes('##')
    );
  }

  formatMessage(message: Message): string {
    let content = message.content;
    if (message.sentBy === 'bot') {
      content = content.replace(/\n/g, '<br>');

      content = content
        .split('\n')
        .map((line) => `<li>${line}</li>`)
        .join('');

      content = `<ul>${content}</ul>`;
    }

    return content;
  }

  updateIsEmpty() {
    this.isEmpty = this.formValue === '';
  }

  checkResponse() {
    this.messages
      .pipe(map((messages) => messages[messages.length - 1]))
      .subscribe((lastMessage) => {
        if (lastMessage.ProductList) {
          lastMessage.isProductMessage = true;
        } else {
          lastMessage.isProductMessage = false;
        }
        if (lastMessage.sentBy === 'bot') {
          this.isLoading = false;
        } else {
          this.isLoading = true;
        }
      });
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

  onProductClicked(productId: number) {
    this.router.navigate(['/details', productId]);
  }
}
