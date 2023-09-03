import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from '../adapter/driven/infra/repositories/order.repository';
import { OrderController } from '../adapter/driver/api/controllers/order.controller';
import { GetOrderByIdApplication } from '../core/Order/application/getOrderById.application';
import { Order } from '../core/Order/domain/entities/order.entity';
import { ORDER_TYPES } from '../core/Order/types';
import { GetOrdersByStoreId } from '../core/Order/application/getOrdersByStoreId.application';
import { GetOrdersByStoreIdAndStatus } from '../core/Order/application/getOrdersByStoreIdAndStatus.application';
import { PutStatusById } from 'src/core/Order/application/putStatusByStoreId.application';

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
  useClass: GetOrdersByStoreIdAndStatus,
};

const putStatusByOrderId  = {
  provide: ORDER_TYPES.applications.IPutStatusById,
  useClass: PutStatusById,
};

const orderRepository = {
  provide: ORDER_TYPES.repositories.IOrderRepository,
  useClass: OrderRepository,
};

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [
    orderRepository,
    postOrder,
    putStatusByOrderId,
    getOrderByIdApp,
    getOrdersByStoreId,
    getOrdersByStoreIdAndStatus,
  ],
})
export class OrderModule {}
