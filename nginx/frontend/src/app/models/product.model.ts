export interface Image {
  image_id: number;
  image_name: string;
  image_url: string;
  item: number;
}

export interface Review {
  rating: number;
  content: string;
  date: string;
  item: number;
}

export interface Url {
  link: string;
  name: string;
}

export class Product {
  item_id: number;
  images: Image[];
  reviews: Review[];
  name: string;
  urls: Url[];
  details: string;
  description: string;
  price: number;
  rating: number;
  review_count: number;
  summary: string | null;

  constructor(data: any) {
    this.item_id = data.item_id;
    this.images = data.images;
    this.reviews = data.reviews;
    this.name = data.name;
    this.urls = data.urls;
    this.details = data.details;
    this.description = data.description;
    this.price = data.price;
    this.rating = data.rating;
    this.review_count = data.review_count;
    this.summary = data.summarized_reviews;
  }
}

export class ProductsCollection {
  results!: Product[];
  max_pages!: number;

  constructor(results: Product[], max_pages?: number) {
    this.results = results || [];
    this.max_pages = max_pages || 1;
  }
}
