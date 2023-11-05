import { Inject, Injectable } from '@nestjs/common';
import { IGetOrderByIdApplication } from './interfaces/getOrderById.interface';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { Order } from '../domain/entities/order.entity';

@Injectable()
export class GetOrderByIdApplication implements IGetOrderByIdApplication {
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async getOrderById(id: string): Promise<Order> {
    return await this.orderRepository.getById(id);
  }
}
