export class Message {
  constructor(
    public content: string,
    public sentBy: string,
    public imageUrl?: string,
    public linkUrl?: string,
    public linkText?: string
  ) {}
}
