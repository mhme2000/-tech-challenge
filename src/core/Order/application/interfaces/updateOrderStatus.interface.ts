import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

export interface IUpdateOrderStatus {
  updateOrderStatus(orderId: string, status: OrderStatusEnum): Promise<void>;
}
