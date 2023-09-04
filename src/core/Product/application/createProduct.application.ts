import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/productRepository.interface';
import { Product } from '../domain/entities/product.entity';
import { ICreateProductApplication } from './interfaces/createProduct.interface';
import { CreateProductDTO } from '../../../adapter/driver/dtos/CreateProductDTO.dto';

@Injectable()
export class CreateProductApplication implements ICreateProductApplication {
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}
  async createProduct(productDto: CreateProductDTO): Promise<Product> {
    const product: Partial<Product> = {
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      storeId: productDto.storeId,
      category: productDto.categoryId,
      image: productDto.image,
      creationDate: new Date(),
    };
    return await this.productRepository.addOrUpdate(product);
  }
}
