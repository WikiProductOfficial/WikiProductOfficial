import { Product } from './product.model';
export class Message {
  constructor(
    public content: string,
    public sentBy: string,
    public ProductList?: Product[],
    public summary?: string,
    public isProductMessage?: boolean
  ) {}
}
