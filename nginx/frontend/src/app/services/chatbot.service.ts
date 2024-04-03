import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
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
    let botMessage = new Message('', 'bot');
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    //MOCK
    setTimeout(() => {
      if (msg === 'give me Device to study with') {
        botMessage = new Message(
          "Here's what i've found!",
          'bot',
          'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1670856032314', // Image URL
          'https://www.apple.com/ca/shop/buy-ipad/ipad/64gb-blue-wifi', // Link URL
          'Click here for more info' // Link text
        );
      } else {
        const letterCount = msg.length;
        const botMessageContent = `${msg} contains exactly ${letterCount} letters.`;
        botMessage = new Message(botMessageContent, 'bot');
      }
      this.update(botMessage);
    }, 1500); // 1.5 seconds delay
  }

  //send the message to the chatbot and then return the recieved response
}
