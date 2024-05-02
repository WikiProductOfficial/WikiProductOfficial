import { ChatbotService } from './../../services/chatbot.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { map, scan, tap } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { CurrencyConversionPipe } from '../../pipes/currency-conversion.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.scss',
  imports: [
    InputTextModule,
    CommonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    DialogModule,
    RatingModule,
    CurrencyConversionPipe,
  ],
})
export class ChatDialogComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  displayChatbotDialog: boolean = false;
  messages: Observable<Message[]> = new Observable<Message[]>();
  formValue: string = '';
  isEmpty: boolean = true;
  dotsCount: number = 1;
  isLoading: boolean = false;

  //Mock number of products

  constructor(private chat: ChatbotService, private router: Router) {}

  ngOnInit() {
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

  showDialog() {
    this.displayChatbotDialog = true;
  }

  hideDialog() {
    this.displayChatbotDialog = false;
  }

  updateIsEmpty() {
    this.isEmpty = this.formValue === '';
  }

  checkResponse() {
    this.messages
      .pipe(
        map((messages) => messages[messages.length - 1]),
        tap((lastMessage) => {
          lastMessage.isProductMessage = !!lastMessage.ProductList;
          this.isLoading = lastMessage.sentBy !== 'bot';
        })
      )
      .subscribe();
  }

  sendMessage() {
    if (!this.isEmpty && !this.isLoading) {
      this.chat.converse(this.formValue);
      this.formValue = '';
      this.isEmpty = true;
      this.checkResponse();
    }
  }

  onProductClicked(productId: number) {
    this.router.navigate(['/details', productId]);
  }
}
