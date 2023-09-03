import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { IGetOrdersByStoreId } from './interfaces/getOrdersByStoreId.interface';
import { Order } from '../domain/entities/order.entity';

@Injectable()
export class GetOrdersByStoreId implements IGetOrdersByStoreId {
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async getByStoreId(storeId: string): Promise<Order[]> {
    return await this.orderRepository.getByStoreId(storeId);
  }
}
