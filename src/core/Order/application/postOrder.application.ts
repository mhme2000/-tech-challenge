import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repositories/interfaces/orderRepository.interface';
import { ORDER_TYPES } from '../types';
import { IPostOrder } from './interfaces/postOrder.interface';
import { OrderDTO } from 'src/adapter/driver/dtos/OrderDTO.dto';
import { Order } from '../domain/entities/order.entity';
import { OrderStatusEnum } from '../domain/enums/orderStatus.enum';
import { OrderItem } from '../domain/entities/orderItem.entity';
import { OrderPaymentStatusEnum } from '../domain/enums/paymentStatus.enum';
/* eslint-disable @typescript-eslint/no-var-requires */
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class PostOrder implements IPostOrder {
  constructor(
    @Inject(ORDER_TYPES.repositories.IOrderRepository)
    private orderRepository: IOrderRepository,
  ) {}

  async postOrder(orderDto: OrderDTO): Promise<string> {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const orderStatus = await this.orderRepository.getStatusByDescription(
      OrderStatusEnum.PENDING_PAYMENT,
    );

    const previsionDeliveryDate = today;
    previsionDeliveryDate.setHours(previsionDeliveryDate.getHours() + 1);

    const order: Partial<Order> = {
      creationDate: today,
      customerId: orderDto.customerId,
      previsionDeliveryDate: previsionDeliveryDate,
      totalPrice: 0,
      storeId: orderDto.storeId,
      statusId: orderStatus,
      paymentStatus: OrderPaymentStatusEnum.PENDING,
      externalPaymentId: uuidv4(),
    };

    const orderId = await this.orderRepository.createOrUpdateOrder(order);
    order.id = orderId;

    let totalPrice = 0;
    orderDto.orderItems.forEach(async (orderItemDto) => {
      totalPrice = totalPrice + (orderItemDto.price - orderItemDto.discount);
      const orderItem: Omit<OrderItem, 'id'> = {
        orderId: orderId,
        quantity: orderItemDto.quantity,
        price: orderItemDto.price,
        discount: orderItemDto.discount,
        productId: orderItemDto.productId,
      };
      await this.orderRepository.createOrderItem(orderItem);
    });
    order.totalPrice = totalPrice;
    await this.orderRepository.createOrUpdateOrder(order);
    return orderId;
  }
}
