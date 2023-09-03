import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

export interface IPutStatusById {
  putStatusByOrderId(orderId: string, status: OrderStatusEnum): Promise<void>;
}
