import { Order } from '../../domain/entities/order.entity';

export interface IGetOrdersByStoreId {
  getByStoreId(storeId: string): Promise<Order[]>;
}
