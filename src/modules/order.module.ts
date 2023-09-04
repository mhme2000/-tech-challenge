import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from '../adapter/driven/infra/repositories/order.repository';
import { OrderController } from '../adapter/driver/api/controllers/order.controller';
import { GetOrderByIdApplication } from '../core/Order/application/getOrderById.application';
import { Order } from '../core/Order/domain/entities/order.entity';
import { ORDER_TYPES } from '../core/Order/types';
import { GetOrdersByStoreId } from '../core/Order/application/getOrdersByStoreId.application';
import { GetOrdersByStoreIdAndStatus } from '../core/Order/application/getOrdersByStoreIdAndStatus.application';
import { PutStatusById } from '../core/Order/application/putStatusByStoreId.application';
import { GetOrderByExternalPaymentIdApplication } from '../core/Order/application/getOrderByExternalPaymentId.application';
import { UpdateOrderPaymentStatus } from '../core/Order/application/updateOrderPaymentStatus.application';
import { UpdateOrderStatus } from '../core/Order/application/updateOrderStatus.application';
import { OrderItem } from '../core/Order/domain/entities/orderItem.entity';
import { OrderStatus } from '../core/Order/domain/entities/orderStatus.entity';
import { PostOrder } from '../core/Order/application/postOrder.application';

// Order
const getOrderByIdApp = {
  provide: ORDER_TYPES.applications.IGetOrderByIdApplication,
  useClass: GetOrderByIdApplication,
};

const getOrdersByStoreId = {
  provide: ORDER_TYPES.applications.IGetOrdersByStoreId,
  useClass: GetOrdersByStoreId,
};

const getOrdersByStoreIdAndStatus = {
  provide: ORDER_TYPES.applications.IGetOrdersByStoreIdAndStatus,
  useClass: GetOrdersByStoreIdAndStatus,
};

const postOrder = {
  provide: ORDER_TYPES.applications.IPostOrder,
  useClass: PostOrder,
};

const putStatusByOrderId = {
  provide: ORDER_TYPES.applications.IPutStatusById,
  useClass: PutStatusById,
};

const getOrderByExternalPaymentId = {
  provide: ORDER_TYPES.applications.IGetOrderByExternalPaymentId,
  useClass: GetOrderByExternalPaymentIdApplication,
};

const updateOrderPaymentStatus = {
  provide: ORDER_TYPES.applications.IUpdateOrderPaymentStatus,
  useClass: UpdateOrderPaymentStatus,
};

const updateOrderStatus = {
  provide: ORDER_TYPES.applications.IUpdateOrderStatus,
  useClass: UpdateOrderStatus,
};

const orderRepository = {
  provide: ORDER_TYPES.repositories.IOrderRepository,
  useClass: OrderRepository,
};

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order, OrderItem, OrderStatus])],
  providers: [
    orderRepository,
    postOrder,
    putStatusByOrderId,
    getOrderByIdApp,
    getOrdersByStoreId,
    getOrdersByStoreIdAndStatus,
    updateOrderPaymentStatus,
    updateOrderStatus,
    getOrderByExternalPaymentId,
  ],
})
export class OrderModule {}
