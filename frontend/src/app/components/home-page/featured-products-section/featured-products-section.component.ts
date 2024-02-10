import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-featured-products-section',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './featured-products-section.component.html',
  styleUrl: './featured-products-section.component.scss',
})
export class FeaturedProductsSectionComponent {
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  productList = [
    {
      imageSource: 'assets/images/zeke funko.jpg',
      iconSource: 'assets/icons/amazon-svgrepo-com.svg',
      title:
        'Funko Pop! Deluxe Marvel: Sinister 6 - Doctor Octopus, Amazon Exclusive, Figure 1 of 7 Funko Pop! Avengers Endgame: I Am Iron Man Glow-In-the-Dark Deluxe Vinyl Figure, Multicolored',
      description: 'Lorem ipsum dolor sit amet',
      price: '89',
    },
    {
      imageSource: 'assets/images/pngwing.com.png',
      iconSource: 'assets/icons/Extra_Logo.svg',
      title: 'Green Hills',
      description: 'Lorem ipsum dolor sit amet',
      price: '9999999999999999999999999999999999999999999999999999999999999999',
    },
    {
      imageSource: 'assets/images/pngwing.com.png',
      iconSource: 'assets/icons/Jarir.svg',
      title: 'Iceland breeze',
      description: 'Lorem ipsum dolor sit amet',
      price: '109',
    },
    {
      imageSource: 'assets/images/a.jpg',
      iconSource: 'assets/icons/amazon-svgrepo-com.svg',
      title: 'Product 4',
      description: 'Description for Product 4',
      price: '119',
    },
    {
      imageSource: 'assets/images/im.jpg',
      iconSource: 'assets/icons/amazon-svgrepo-com.svg',
      title: 'Product 5',
      description: 'Description for Product 5',
      price: '129',
    },
    {
      imageSource: 'assets/images/imgg.png',
      iconSource: 'assets/icons/amazon-svgrepo-com.svg',
      title: 'Product 6',
      description: 'Description for Product 6',
      price: '139',
    },
  ];
  // TODO: Do a function that take you to results page.
}
