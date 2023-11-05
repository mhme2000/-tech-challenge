import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/productRepository.interface';
import { Product } from '../domain/entities/product.entity';
import { IGetProductByCategoryIdApplication } from './interfaces/getProductByCategoryId.interface';

@Injectable()
export class GetProductByCategoryIdApplication
  implements IGetProductByCategoryIdApplication
{
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async getProductByCategoryId(categoryId: string): Promise<Product[]> {
    return await this.productRepository.getByCategoryId(categoryId);
  }
}
