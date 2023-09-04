import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/orderItem.entity';
import { OrderStatus } from '../../entities/orderStatus.entity';
import { OrderStatusEnum } from '../../enums/orderStatus.enum';
import { OrderPaymentStatusEnum } from '../../enums/paymentStatus.enum';

export interface IOrderRepository {
  getById(orderId: string): Promise<Order>;
  getByStoreId(storeId: string): Promise<Order[]>;
  getOrderByExternalPaymentId(externalPaymentId: string): Promise<Order>;
  getByStoreIdAndStatus(
    storeId: string,
    status: OrderStatusEnum,
  ): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: OrderStatusEnum): Promise<void>;
  updateOrderPaymentStatus(
    orderId: string,
    status: OrderPaymentStatusEnum,
  ): Promise<void>;
  getStatusByDescription(status: string): Promise<OrderStatus>;
  putStatusByOrderId(order: Order): Promise<void>;
  createOrUpdateOrder(order: Partial<Order>): Promise<string>;
  createOrderItem(orderItem: Omit<OrderItem, 'id'>): Promise<void>;
}
