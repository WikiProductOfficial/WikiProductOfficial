import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor() {}

  conversation = new BehaviorSubject<Message[]>([]);

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    //MOCK
    const letterCount = msg.length;
    const botMessageContent = `${msg} contains exactly ${letterCount} letters.`;
    const botMessage = new Message(botMessageContent, 'bot');
    return this.update(botMessage);
    //send the message to the chatbot and then return the recieved response
  }

  talk() {}
}
