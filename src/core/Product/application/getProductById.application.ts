import { Inject, Injectable } from '@nestjs/common';
import { IGetProductByIdApplication } from './interfaces/getProductById.interface';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/ProductRepository.interface';
import { Product } from '../domain/entities/Product.entity';

@Injectable()
export class GetProductByIdApplication implements IGetProductByIdApplication {
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) { }

  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.getById(id);
  }
}
