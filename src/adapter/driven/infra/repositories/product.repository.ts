import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../../core/Product/domain/entities/product.entity';
import { IProductRepository } from '../../../../core/Product/domain/repositories/interfaces/productRepository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}
  async getById(productId: string): Promise<Product> {
    return await this.repository.findOneBy({ id: productId });
  }

  async getByCategoryId(categoryId: string): Promise<Product[]> {
    return await this.repository
      .createQueryBuilder('product')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async get(): Promise<Product[]> {
    return await this.repository.find();
  }

  async hardDelete(product: Product): Promise<void> {
    await this.repository.remove(product);
  }

  async addOrUpdate(product: Partial<Product>): Promise<Product> {
    return await this.repository.save(product);
  }
}
