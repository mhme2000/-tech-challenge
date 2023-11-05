import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { Order } from '../domain/entities/order.entity';
import { IGetOrderByExternalPaymentId } from './interfaces/getOrderByExternalPaymentId.interface';

@Injectable()
export class GetOrderByExternalPaymentIdApplication
  implements IGetOrderByExternalPaymentId
{
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async getOrderByExternalPaymentId(externalPaymentId: string): Promise<Order> {
    return await this.orderRepository.getOrderByExternalPaymentId(
      externalPaymentId,
    );
  }
}
