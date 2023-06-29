import { Product } from '../../domain/entities/Product.entity';

export interface IGetAllProductsApplication {
  getAllProducts(): Promise<Product[]>;
}
