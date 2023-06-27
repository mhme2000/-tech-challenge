import { Order } from '../../domain/entities/order.entity';

export interface IGetOrderByIdApplication {
  getOrderById(orderId: string): Promise<Order>;
}
