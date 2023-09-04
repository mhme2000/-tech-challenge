import { Product } from '../../domain/entities/product.entity';

export interface IUpdateProductByIdApplication {
  updateProductById(
    productId: string,
    product: Partial<Product>,
  ): Promise<Product>;
}
