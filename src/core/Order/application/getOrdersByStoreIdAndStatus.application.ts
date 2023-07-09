import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { Order } from '../domain/entities/order.entity';
import { IGetOrdersByStoreIdAndStatus } from './interfaces/getOrdersByStoreIdAndStatus.interface';
import { OrderStatusEnum } from '../domain/enums/orderStatus.enum';

@Injectable()
export class GetOrdersByStoreIdAndStatus
  implements IGetOrdersByStoreIdAndStatus
{
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async getByStoreIdAndStatus(
    storeId: string,
    status: OrderStatusEnum,
  ): Promise<Order[]> {
    return await this.orderRepository.getByStoreIdAndStatus(storeId, status);
  }
}
