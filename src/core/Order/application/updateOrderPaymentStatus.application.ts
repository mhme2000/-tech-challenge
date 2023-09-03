import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { OrderPaymentStatusEnum } from '../domain/enums/paymentStatus.enum';
import { IUpdateOrderPaymentStatus } from './interfaces/updateOrderPaymentStatus.interface';

@Injectable()
export class UpdateOrderPaymentStatus implements IUpdateOrderPaymentStatus {
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async updateOrderPaymentStatus(
    orderId: string,
    status: OrderPaymentStatusEnum,
  ): Promise<void> {
    await this.orderRepository.updateOrderPaymentStatus(orderId, status);
  }
}
