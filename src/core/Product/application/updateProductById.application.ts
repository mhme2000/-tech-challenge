import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/productRepository.interface';
import { IUpdateProductByIdApplication } from './interfaces/updateProductById.interface';
import { Product } from '../domain/entities/product.entity';
@Injectable()
export class UpdateProductByIdApplication
  implements IUpdateProductByIdApplication
{
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async updateProductById(
    productId: string,
    productData: Partial<Product>,
  ): Promise<Product> {
    const productOld = await this.productRepository.getById(productId);

    if (productOld == null)
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);

    return await this.productRepository.addOrUpdate({
      ...productOld,
      ...productData,
    });
  }
}
