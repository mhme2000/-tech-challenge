import { Product } from '../../domain/entities/Product.entity';

export interface IUpdateProductByIdApplication {
  updateProductById(productId: string, product: Product): Promise<Product>;
}
