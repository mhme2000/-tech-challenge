import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/ProductRepository.interface';
import { IDeleteProductByIdApplication } from './interfaces/deleteProductById.interface';

@Injectable()
export class DeleteProductByIdApplication implements IDeleteProductByIdApplication {
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) { }
  async deleteProductById(productId: string): Promise<void> {
    var product = await this.productRepository.getById(productId);
    if (product == null) throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    await this.productRepository.hardDelete(product);
  }
}
