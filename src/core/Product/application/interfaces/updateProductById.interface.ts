import { Product } from '../../domain/entities/product.entity';
import { UpdateProductDTO } from '../../../../adapter/driver/dtos/UpdateProductDTO.dto';

export interface IUpdateProductByIdApplication {
  updateProductById(product: UpdateProductDTO): Promise<Product>;
}
