import { Product } from '../../domain/entities/product.entity';

export interface IGetProductByCategoryIdApplication {
  getProductByCategoryId(categoryId: string): Promise<Product[]>;
}
