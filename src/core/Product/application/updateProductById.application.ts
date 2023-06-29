import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/ProductRepository.interface';
import { IUpdateProductByIdApplication } from './interfaces/updateProductById.interface';
import { Product } from '../domain/entities/Product.entity';

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
    product: Product,
  ): Promise<Product> {
    const productOld = await this.productRepository.getById(productId);
    if (product == null)
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    productOld.name = product.name;
    productOld.description = product.description;
    return await this.productRepository.addOrUpdate(productOld);
  }
}
