import { Order } from '../../domain/entities/order.entity';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

export interface IGetOrdersByStoreIdAndStatus {
  getByStoreIdAndStatus(
    storeId: string,
    status: OrderStatusEnum,
  ): Promise<Order[]>;
}
