import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { OrderStatusEnum } from '../domain/enums/orderStatus.enum';
import { IPutStatusById } from './interfaces/putStatusById.interface';

@Injectable()
export class PutStatusById implements IPutStatusById {
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async putStatusByOrderId(
    orderId: string,
    status: OrderStatusEnum,
  ): Promise<void> {
    const order = await this.orderRepository.getById(orderId);
    if (order == null)
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    const orderStatus = await this.orderRepository.getStatusByDescription(
      status,
    );
    if (orderStatus == null)
      throw new HttpException('Status not found.', HttpStatus.NOT_FOUND);
    order.statusId.id = orderStatus.id;
    this.orderRepository.putStatusByOrderId(order);
  }
}
