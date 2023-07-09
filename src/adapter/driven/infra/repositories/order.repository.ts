import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../../core/Order/domain/entities/order.entity';
import { IOrderRepository } from '../../../../core/Order/domain/repositories/interfaces/orderRepository.interface';
import { Repository } from 'typeorm';
import { OrderStatusEnum } from 'src/core/Order/domain/enums/orderStatus.enum';
import { OrderStatus } from 'src/core/Order/domain/entities/orderStatus.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async getByStoreId(storeId: string): Promise<Order[]> {
    return await this.orderRepository.findBy({ storeId });
  }

  async getByStoreIdAndStatus(
    storeId: string,
    status: OrderStatusEnum,
  ): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder("order")
      .innerJoinAndSelect("order.statusId", "orderStatus")
      .where('orderStatus.status = :status', { status })
      .andWhere('order.storeId = :storeId', { storeId })
      .getMany();
  }

  async getById(orderId: string): Promise<Order> {
    return await this.orderRepository.findOneBy({ id: orderId });
  }
}
