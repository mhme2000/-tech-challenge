import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/ProductRepository.interface';
import { Product } from '../domain/entities/Product.entity';
import { ICreateProductApplication } from './interfaces/createProduct.interface';

@Injectable()
export class CreateProductApplication implements ICreateProductApplication {
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}
  async createProduct(product: Product): Promise<Product> {
    return await this.productRepository.addOrUpdate(product);
  }
}
