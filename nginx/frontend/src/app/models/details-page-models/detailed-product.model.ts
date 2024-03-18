import { ProductDescription } from './product-description.model';
import { ProductTabs } from './product-tabs.model';
import { ProviderInfo } from './providerInfo.model';
import { RelatedProduct } from './related-product.model';

export interface DetailedProduct {
  name: string;
  item_id: number;
  image_urls: string[];
  description: ProductDescription;
  providers: ProviderInfo[];
  tabs: ProductTabs[];
  related_products: RelatedProduct[];
}
