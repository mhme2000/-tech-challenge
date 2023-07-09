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
    return await this.repository.findOne({
      relations: {
        category: true,
      },
      where: {
        id: productId,
      },
    });
  }
  async getByCategoryId(categoryId: string): Promise<Product[]> {
    return await this.repository.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          id: categoryId,
        },
      },
    });
  }
  async get(): Promise<Product[]> {
    return await this.repository.find({
      relations: {
        category: true,
      },
    });
  }
  async hardDelete(product: Product): Promise<void> {
    await this.repository.remove(product);
  }
  async addOrUpdate(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }
}
