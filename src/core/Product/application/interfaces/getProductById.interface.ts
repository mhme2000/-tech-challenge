import { Product } from '../../domain/entities/product.entity';

export interface IGetProductByIdApplication {
  getProductById(productId: string): Promise<Product>;
}
