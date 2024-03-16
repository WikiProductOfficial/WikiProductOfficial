import { Injectable } from '@angular/core';
import { ProviderInfo } from '../models/providerInfo.model';
import { ProductTabs } from '../models/product-tabs.model';
import { RelatedProduct } from '../models/related-product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  // get product images
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

  // Get product description

  getDescription(): Promise<any> {
    const description = {
      title:
        'iPad 2021 (9th Generation) 10.2-Inch, 64GB, WiFi, Space Gray With Facetime - International Version',
      brand: 'Apple',
      model: 'Apple iPad 9th gen',
      rating: 3.1,
      features: [
        'α9 Gen5 AI Processor with AI Picture Pro & AI 4K Upscaling',
        'Pixel Dimming, Perfect Black, 100% Color Fidelity & Color Volume',
        'Hands-free Voice Control, Always Ready',
        'Dolby Vision IQ with Precision Detail, Dolby Atmos, Filmmaker Mode',
        'Eye Comfort Display: Low-Blue Light, Flicker-Free',
      ],
    };

    return Promise.resolve(description);
  }

  // Get Providers

  getProviderData(): ProviderInfo[] {
    return [
      {
        header: 'Cheapest',
        price: 1205,
        companyName: 'Noon',
        imageUrl:
          'https://f.nooncdn.com/s/app/com/noon/design-system/logos/noon-logo-en.svg',
        visitUrl:
          'https://www.noon.com/saudi-en/ipad-pro-2022-4th-generation-11-inch-128gb-wifi-space-gray-middle-east-version/N53359882A/p/?o=b20ecf8bf15fd88c',
      },
      {
        header: 'Nearest',
        price: 2200,
        companyName: 'Jarir',
        imageUrl: 'https://www.jarir.com/assets/images/logo/jarir.svg',
        visitUrl:
          'https://www.jarir.com/dp/apple-ipad-pro-11-2022-tablet-pc-598754.html?gad_source=1&gclid=CjwKCAjw48-vBhBbEiwAzqrZVIFbLCcY1KDFAVCxhLNX_epip2dG45pk7m1yYeEN0eKvkNRaCPNVMhoCUUUQAvD_BwE&gclsrc=aw.ds',
      },
      {
        header: 'Official',
        price: 3300,
        companyName: 'Apple',
        imageUrl:
          'https://media.licdn.com/dms/image/D4D12AQHwi4jdRd3fQQ/article-cover_image-shrink_720_1280/0/1685279753620?e=1715817600&v=beta&t=YFLMefH_CKTjH0rS02UYGlJrRBqVies5p2VvnKqLDL8',
        visitUrl: 'https://www.apple.com/ipad-pro/',
      },
    ];
  }

  // get product tabs
  getProductTabs(): ProductTabs[] {
    return [
      {
        header: 'Description',
        contentType: 0,
        contentHead: null,
        content: [
          'α9 Gen5 AI Processor with AI Picture Pro & AI 4K Upscaling',
          'Pixel Dimming, Perfect Black, 100% Color Fidelity & Color Volume',
          'Hands-free Voice Control, Always Ready',
          'Dolby Vision IQ with Precision Detail, Dolby Atmos, Filmmaker Mode',
          'Eye Comfort Display: Low-Blue Light, Flicker-Free',
          'α9 Gen5 AI Processor with AI Picture Pro & AI 4K Upscaling',
          'Pixel Dimming, Perfect Black, 100% Color Fidelity & Color Volume',
          'Hands-free Voice Control, Always Ready',
          'Dolby Vision IQ with Precision Detail, Dolby Atmos, Filmmaker Mode',
          'Eye Comfort Display: Low-Blue Light, Flicker-Free',
        ],
      },
      {
        header: 'Specification',
        contentType: 1,
        contentHead: [
          'Expandable Memory Type',
          'Secondary Camera Resolution',
          'Charging Type',
          'Display Resolution Type',
          'SIM Type',
          'Connection Type',
        ],
        content: [
          'No Expandable Memory',
          '12 MP',
          'Type-C',
          'Full HD',
          'No SIM Card',
          'Wifi',
        ],
      },
    ];
  }

  // get related Product
  getRelatedProducts(): RelatedProduct[] {
    return [
      {
        imageSource: 'assets/images/zeke funko.jpg',
        title:
          'Funko Pop! Deluxe Marvel: Sinister 6 - Doctor Octopus, Amazon Exclusive, Figure 1 of 7 Funko Pop! Avengers Endgame: I Am Iron Man Glow-In-the-Dark Deluxe Vinyl Figure, Multicolored',
        price: 89,
        rating: 4,
      },
      {
        imageSource: 'assets/images/pngwing.com.png',
        title: 'Green Hills',
        price: 999,
        rating: 5,
      },
      {
        imageSource: 'assets/images/pngwing.com.png',
        title: 'Iceland breeze',
        price: 293,
        rating: 5,
      },
      {
        imageSource: 'assets/images/a.jpg',
        title: 'Product 4',
        price: 119,
        rating: 5,
      },
      {
        imageSource: 'assets/images/im.jpg',
        title: 'Product 5',
        price: 123,
        rating: 5,
      },
      {
        imageSource: 'assets/images/imgg.png',
        title: 'Product 6',
        price: 320,
        rating: 5,
      },
    ];
  }
}
