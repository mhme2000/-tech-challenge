import { AddOrUpdateProductDto } from '../../domain/dtos/addOrUpdateProductDto';
import { Product } from '../../domain/entities/product.entity';

export interface ICreateProductApplication {
  createProduct(product: AddOrUpdateProductDto): Promise<Product>;
}
