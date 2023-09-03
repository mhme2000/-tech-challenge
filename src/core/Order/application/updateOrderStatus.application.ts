import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { OrderStatusEnum } from '../domain/enums/orderStatus.enum';
import { IUpdateOrderStatus } from './interfaces/updateOrderStatus.interface';

@Injectable()
export class UpdateOrderStatus implements IUpdateOrderStatus {
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async updateOrderStatus(
    orderId: string,
    status: OrderStatusEnum,
  ): Promise<void> {
    await this.orderRepository.updateOrderStatus(orderId, status);
  }
}
