import { Product } from "../../domain/entities/Product.entity";

export interface ICreateProductApplication {
  createProduct(product: Product): Promise<Product>;
}
