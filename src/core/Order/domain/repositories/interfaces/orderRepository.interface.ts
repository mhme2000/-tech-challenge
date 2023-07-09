import { Order } from '../../entities/order.entity';
import { OrderStatusEnum } from '../../enums/orderStatus.enum';

export interface IOrderRepository {
  getById(orderId: string): Promise<Order>;
  getByStoreId(storeId: string): Promise<Order[]>;
  getByStoreIdAndStatus(storeId: string, status: OrderStatusEnum): Promise<Order[]>;
}
