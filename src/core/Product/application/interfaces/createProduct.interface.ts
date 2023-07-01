import { AddOrUpdateProductDto } from '../../domain/dtos/addOrUpdateProductDto';
import { Product } from '../../domain/entities/Product.entity';

export interface ICreateProductApplication {
  createProduct(product: AddOrUpdateProductDto): Promise<Product>;
}
