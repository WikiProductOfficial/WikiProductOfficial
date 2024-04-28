import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';
import { Product, Image, Review, Url } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  conversation = new BehaviorSubject<Message[]>([]);
  botResponse!: string;
  productList: Product[] | undefined;
  testProduct: Product | undefined;

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    let botMessage = new Message('', 'bot');
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    // // MOCK;
    // setTimeout(async () => {
    //   if (msg === 'tt') {
    //     // Example array of product IDs received from JSON

    //     if (this.productList.length > 0) {
    //       botMessage = new Message(
    //         "Here's what i've found!",
    //         'bot',
    //         this.productList,
    //         'ipad the 10th generation suitable for studying and taking notes, \n Available in Amazon, Jarir, and Extra.'
    //       );
    //     } else {
    //       const letterCount = msg.length;
    //       const botMessageContent = `${msg} contains exactly ${letterCount} letters.`;
    //       botMessage = new Message(botMessageContent, 'bot');
    //     }
    //     this.update(botMessage);
    //   }
    // }, 1500); // 1.5 seconds delay

    this.getResponse(msg).subscribe(async (data) => {
      this.botResponse = data.response;
      const productIDs: number[] = data.items;
      this.productList = [];
      for (const productId of productIDs) {
        await this.fetchProduct(productId);
        if (this.testProduct) {
          this.productList.push(this.testProduct);
        }
      }
      console.log(this.productList);
      botMessage = new Message(this.botResponse, 'bot', this.productList);
      this.update(botMessage);
    });

    //send the message to the chatbot and then return the recieved response
  }

  getResponse(message: string): Observable<any> {
    let url = 'http://localhost:8000/api/llm/query/';
    let body = { query: message };
    return this.http.post(url, body);
  }

  async fetchProduct(productId: number) {
    try {
      this.testProduct = await this.productService
        .getDetailedProduct(productId)
        .toPromise();
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  clearConversation() {
    this.conversation.next([]);
  }
}
