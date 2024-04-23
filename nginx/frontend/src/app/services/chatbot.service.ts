import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(private http: HttpClient) {}

  conversation = new BehaviorSubject<Message[]>([]);
  botResponse!: string;

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    let botMessage = new Message('', 'bot');
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    //MOCK
    // setTimeout(() => {
    //   if (msg === 'give me device to study') {
    //     botMessage = new Message(
    //       "Here's what i've found!",
    //       'bot',
    //       'https://cdn.mos.cms.futurecdn.net/3ocVBsmUQ8RnygZrMMQ2JT.jpg', // Image URL
    //       'ipad 9', // Title
    //       '599', // price
    //       'https://www.apple.com/sa/ipad-10.2/', //link
    //       '4.5', //rating
    //       'ipad the 10th generation suitable for studying and taking notes, \n Available in Amazon, Jarir, and Extra.'
    //     );
    //   } else {
    //     const letterCount = msg.length;
    //     const botMessageContent = `${msg} contains exactly ${letterCount} letters.`;
    //     botMessage = new Message(botMessageContent, 'bot');
    //   }
    //   this.update(botMessage);
    // }, 1500); // 1.5 seconds delay

    //send the message to the chatbot and then return the recieved response
    this.getResponse(msg).subscribe((response: string) => {
      this.botResponse = response;
      botMessage = new Message(this.botResponse, 'bot');
      console.log(botMessage.content);
      this.update(botMessage);
    });
  }

  getResponse(message: string): Observable<any> {
    let url = 'http://localhost:8000/api/llm/query/';
    let body = { query: message };
    return this.http.request('post', url, {
      body,
      responseType: 'text',
      observe: 'body',
    });
  }

  clearConversation() {
    this.conversation.next([]);
  }
}
