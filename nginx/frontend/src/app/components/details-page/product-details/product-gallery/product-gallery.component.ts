import { Component, Input } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
})
export class ProductGalleryComponent {
  //gallery
  @Input() images!: string[];
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 4,
      },
      {
        breakpoint: '560px',
        numVisible: 3,
      },
    ];
  }
}
