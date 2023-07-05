import { AddOrUpdateProductDto } from '../../domain/dtos/addOrUpdateProductDto';
import { Product } from '../../domain/entities/product.entity';

export interface IUpdateProductByIdApplication {
  updateProductById(product: AddOrUpdateProductDto): Promise<Product>;
}
