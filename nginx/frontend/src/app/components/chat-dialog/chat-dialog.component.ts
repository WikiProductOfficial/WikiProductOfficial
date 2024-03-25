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
import { scan } from 'rxjs/operators';

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
  ],
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.scss',
})
export class ChatDialogComponent implements OnInit {
  messages: Observable<Message[]> = new Observable<Message[]>();
  formValue!: string;

  constructor(private chat: ChatbotService) {}

  ngOnInit() {
    this.messages = this.chat.conversation
      .asObservable()
      .pipe(scan((acc, value) => acc.concat(value)));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
