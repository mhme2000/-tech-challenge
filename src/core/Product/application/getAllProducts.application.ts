import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/productRepository.interface';
import { Product } from '../domain/entities/product.entity';
import { IGetAllProductsApplication } from './interfaces/getAllProducts.interface';

@Injectable()
export class GetAllProductsApplication implements IGetAllProductsApplication {
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}
  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.get();
  }
}
