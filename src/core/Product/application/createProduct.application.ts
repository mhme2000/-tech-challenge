import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/ProductRepository.interface';
import { Product } from '../domain/entities/Product.entity';
import { ICreateProductApplication } from './interfaces/createProduct.interface';
import { AddOrUpdateProductDto } from '../domain/dtos/addOrUpdateProductDto';
import { Category } from '../domain/entities/category.entity';

@Injectable()
export class CreateProductApplication implements ICreateProductApplication {
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}
  async createProduct(productDto: AddOrUpdateProductDto): Promise<Product> {
    const product: Product = {
      name: productDto.name,
      description: productDto.description,
    };
    product.category = Object.assign(new Category(), {
      id: productDto.categoryId,
    });
    return await this.productRepository.addOrUpdate(product);
  }
}
