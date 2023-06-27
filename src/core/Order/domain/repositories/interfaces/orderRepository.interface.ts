import { Order } from '../../entities/order.entity';

export interface IOrderRepository {
  getById(orderId: string): Promise<Order>;
}
