import { OrderPaymentStatusEnum } from '../../domain/enums/paymentStatus.enum';

export interface IUpdateOrderPaymentStatus {
  updateOrderPaymentStatus(
    orderId: string,
    status: OrderPaymentStatusEnum,
  ): Promise<void>;
}
