import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getImages(): Promise<any[]> {
    // mock Images & place holders
    const images = [
      {
        itemImageSrc:
          'https://f.nooncdn.com/p/v1686205684/N50867004A_1.jpg?format=avif&width=240',
        thumbnailImageSrc:
          'https://f.nooncdn.com/p/v1686205684/N50867004A_1.jpg?format=avif&width=120',
      },
      {
        itemImageSrc:
          'https://f.nooncdn.com/p/v1643263567/N50867004A_2.jpg?format=avif&width=240',
        thumbnailImageSrc:
          'https://f.nooncdn.com/p/v1643263567/N50867004A_2.jpg?format=avif&width=240',
      },
      {
        itemImageSrc:
          'https://f.nooncdn.com/p/v1643263568/N50867004A_3.jpg?format=avif&width=240',
        thumbnailImageSrc:
          'https://f.nooncdn.com/p/v1643263568/N50867004A_3.jpg?format=avif&width=240',
      },
      {
        itemImageSrc:
          'https://f.nooncdn.com/p/v1643263568/N50867004A_4.jpg?format=avif&width=240',
        thumbnailImageSrc:
          'https://f.nooncdn.com/p/v1643263568/N50867004A_4.jpg?format=avif&width=240',
      },
      {
        itemImageSrc:
          'https://f.nooncdn.com/p/v1643263568/N50867004A_5.jpg?format=avif&width=240',
        thumbnailImageSrc:
          'https://f.nooncdn.com/p/v1643263568/N50867004A_5.jpg?format=avif&width=240',
      },
    ];

    return Promise.resolve(images);
  }
}
