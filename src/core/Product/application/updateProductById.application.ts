import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/productRepository.interface';
import { IUpdateProductByIdApplication } from './interfaces/updateProductById.interface';
import { Product } from '../domain/entities/product.entity';
import { AddOrUpdateProductDto } from '../domain/dtos/addOrUpdateProductDto';

@Injectable()
export class UpdateProductByIdApplication
  implements IUpdateProductByIdApplication
{
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}
  async updateProductById(productDto: AddOrUpdateProductDto): Promise<Product> {
    const productOld = await this.productRepository.getById(
      productDto.productId,
    );
    if (productOld == null)
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    const product: Partial<Product> = {
      id: productDto.productId,
      name: productDto.name,
      description: productDto.description,
      creationDate: productOld.creationDate,
    };
    return await this.productRepository.addOrUpdate(product);
  }
}
