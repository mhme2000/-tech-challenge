import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_TYPES } from './types';
import { IProductRepository } from '../domain/repositories/interfaces/productRepository.interface';
import { IUpdateProductByIdApplication } from './interfaces/updateProductById.interface';
import { Product } from '../domain/entities/product.entity';
import { UpdateProductDTO } from '../../../adapter/driver/dtos/UpdateProductDTO.dto';
@Injectable()
export class UpdateProductByIdApplication
  implements IUpdateProductByIdApplication
{
  constructor(
    @Inject(PRODUCT_TYPES.repositories.IProductRepository)
    private productRepository: IProductRepository,
  ) {}
  async updateProductById(productDto: UpdateProductDTO): Promise<Product> {
    const productOld = await this.productRepository.getById(
      productDto.productId,
    );
    if (productOld == null)
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    const product: Partial<Product> = {
      id: productDto.productId,
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      image: productDto.image,
      storeId: productDto.storeId,
      creationDate: productOld.creationDate,
    };
    product.category.id = productDto.categoryId;
    return await this.productRepository.addOrUpdate(product);
  }
}
