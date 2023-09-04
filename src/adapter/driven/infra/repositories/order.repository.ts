import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../../core/Order/domain/entities/order.entity';
import { IOrderRepository } from '../../../../core/Order/domain/repositories/interfaces/orderRepository.interface';
import { Repository } from 'typeorm';
import { OrderStatusEnum } from '../../../../core/Order/domain/enums/orderStatus.enum';
import { OrderPaymentStatusEnum } from '../../../../core/Order/domain/enums/paymentStatus.enum';
import { OrderStatus } from '../../../../core/Order/domain/entities/orderStatus.entity';
import { OrderItem } from '../../../../core/Order/domain/entities/orderItem.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async getOrderByExternalPaymentId(externalPaymentId: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({
      externalPaymentId: externalPaymentId,
    });

    return order;
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatusEnum,
  ): Promise<void> {
    const order = await this.orderRepository.findOneByOrFail({ id: orderId });
    const orderStatus = await this.orderStatusRepository.findOneByOrFail({
      status: status,
    });
    await this.orderRepository.update(order.id!, { statusId: orderStatus });
  }

  async createOrderItem(orderItem: Omit<OrderItem, 'id'>): Promise<void> {
    await this.orderItemRepository.save(orderItem);
  }
  async createOrUpdateOrder(order: Partial<Order>): Promise<string> {
    const orderCreated = await this.orderRepository.save(order);
    return orderCreated.id;
  }

  async getStatusByDescription(status: string): Promise<OrderStatus> {
    return await this.orderStatusRepository
      .createQueryBuilder('orderStatus')
      .where('orderStatus.status = :status', { status })
      .getOne();
  }

  async updateOrderPaymentStatus(
    orderId: string,
    status: OrderPaymentStatusEnum,
  ): Promise<void> {
    const order = await this.orderRepository.findOneByOrFail({ id: orderId });
    await this.orderRepository.update(order.id!, { paymentStatus: status });
  }

  async getByStoreId(storeId: string): Promise<Order[]> {
    return await this.orderRepository.findBy({ storeId });
  }

  async putStatusByOrderId(order: Order): Promise<void> {
    await this.orderRepository.save(order);
  }

  async getByStoreIdAndStatus(
    storeId: string,
    status: OrderStatusEnum,
  ): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.statusId', 'orderStatus')
      .where('orderStatus.status = :status', { status })
      .andWhere('order.storeId = :storeId', { storeId })
      .getMany();
  }

  async getById(orderId: string): Promise<Order> {
    return await this.orderRepository.findOneBy({ id: orderId });
  }
}
