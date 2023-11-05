import { Order } from '../../domain/entities/order.entity';

export interface IGetOrderByExternalPaymentId {
  getOrderByExternalPaymentId(externalPaymentId: string): Promise<Order>;
}
