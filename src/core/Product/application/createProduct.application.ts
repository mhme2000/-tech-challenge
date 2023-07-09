import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/productRepository.interface';
import { Product } from '../domain/entities/product.entity';
import { ICreateProductApplication } from './interfaces/createProduct.interface';
import { AddOrUpdateProductDto } from '../domain/dtos/addOrUpdateProductDto';

@Injectable()
export class CreateProductApplication implements ICreateProductApplication {
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}
  async createProduct(productDto: AddOrUpdateProductDto): Promise<Product> {
    const product: Product = {
      id: null,
      name: productDto.name,
      description: productDto.description,
      creationDate: new Date(),
      categoryId: productDto.categoryId,
    };
    return await this.productRepository.addOrUpdate(product);
  }
}
