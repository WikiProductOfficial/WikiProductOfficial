import { ChatbotService } from './../../services/chatbot.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { map, scan } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [
    InputTextModule,
    CommonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.scss',
})
export class ChatDialogComponent implements OnInit {
  displayChatbotDialog: boolean = false;
  messages: Observable<Message[]> = new Observable<Message[]>();
  formValue: string = '';
  isEmpty: boolean = true;
  isLoading: boolean = false;

  constructor(private chat: ChatbotService) {}

  ngOnInit() {
    this.messages = this.chat.conversation
      .asObservable()
      .pipe(scan((acc, value) => acc.concat(value)));
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
      this.checkResponse();
    }
  }
}
