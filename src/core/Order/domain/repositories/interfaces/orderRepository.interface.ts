import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/orderItem.entity';
import { OrderStatus } from '../../entities/orderStatus.entity';
import { OrderStatusEnum } from '../../enums/orderStatus.enum';

export interface IOrderRepository {
  getById(orderId: string): Promise<Order>;
  getByStoreId(storeId: string): Promise<Order[]>;
  getByStoreIdAndStatus(
    storeId: string,
    status: OrderStatusEnum,
  ): Promise<Order[]>;
  getStatusByDescription(status: string): Promise<OrderStatus>;
  putStatusByOrderId(order: Order): Promise<void>;
  createOrUpdateOrder(order: Order): Promise<string>;
  createOrderItem(orderItem: OrderItem): Promise<void>;
}
