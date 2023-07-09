import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from '../adapter/driven/infra/repositories/order.repository';
import { OrderController } from '../adapter/driver/api/controllers/order.controller';
import { GetOrderByIdApplication } from '../core/Order/application/getOrderById.application';
import { Order } from '../core/Order/domain/entities/order.entity';
import { ORDER_TYPES } from '../core/Order/types';
import { GetOrdersByStoreId } from 'src/core/Order/application/getOrdersByStoreId.application';
import { GetOrdersByStoreIdAndStatus } from 'src/core/Order/application/getOrdersByStoreIdAndStatus.application';

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

const orderRepository = {
  provide: ORDER_TYPES.repositories.IOrderRepository,
  useClass: OrderRepository,
};

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [
    getOrderByIdApp,
    orderRepository,
    getOrdersByStoreId,
    getOrdersByStoreIdAndStatus,
  ],
})
export class OrderModule {}
