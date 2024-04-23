import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(private http: HttpClient) {}

  conversation = new BehaviorSubject<Message[]>([]);

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    let botMessage = new Message('', 'bot');
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    //MOCK
    setTimeout(() => {
      if (msg === 'tt') {
        botMessage = new Message(
          "Here's what i've found!",
          'bot',
          'https://cdn.mos.cms.futurecdn.net/3ocVBsmUQ8RnygZrMMQ2JT.jpg', // Image URL
          'ipad 9', // Title
          '599', // price
          'https://www.apple.com/sa/ipad-10.2/', //link
          '4.5', //rating
          'ipad the 10th generation suitable for studying and taking notes, \n Available in Amazon, Jarir, and Extra.'
        );
      } else {
        const letterCount = msg.length;
        const botMessageContent = `${msg} contains exactly ${letterCount} letters.`;
        botMessage = new Message(botMessageContent, 'bot');
      }
      this.update(botMessage);
    }, 1500); // 1.5 seconds delay
    //send the message to the chatbot and then return the recieved response
  }

  clearConversation() {
    this.conversation.next([]);
  }
}
