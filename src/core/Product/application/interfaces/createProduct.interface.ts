import { CreateProductDTO } from '../../../../adapter/driver/dtos/CreateProductDTO.dto';
import { Product } from '../../domain/entities/product.entity';

export interface ICreateProductApplication {
  createProduct(product: CreateProductDTO): Promise<Product>;
}
