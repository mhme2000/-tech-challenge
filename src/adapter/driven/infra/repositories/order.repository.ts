import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/core/Order/domain/entities/order.entity';
import { IOrderRepository } from 'src/core/Order/domain/repositories/interfaces/orderRepository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  async getById(orderId: string): Promise<Order> {
    return await this.repository.findOneBy({ id: orderId });
  }
}
