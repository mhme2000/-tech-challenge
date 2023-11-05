import { Product } from '../../domain/entities/product.entity';

export interface IGetAllProductsApplication {
  getAllProducts(): Promise<Product[]>;
}
