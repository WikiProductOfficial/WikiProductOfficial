export class Message {
  constructor(
    public content: string,
    public sentBy: string,
    //These attrbutes should be replaced with the product object only
    public imageUrl?: string,
    public title?: string,
    public price?: string,
    public linkUrl?: string,
    public rating?: string,
    //
    public summary?: string,
    public isProductMessage?: boolean
  ) {}
}
