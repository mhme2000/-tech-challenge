import { Product } from '../../entities/product.entity';

export interface IProductRepository {
  getById(productId: string): Promise<Product>;
  get(): Promise<Product[]>;
  hardDelete(product: Product): Promise<void>;
  addOrUpdate(product: Product): Promise<Product>;
}
