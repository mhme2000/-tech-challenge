import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from 'src/adapter/driven/infra/repositories/order.repository';
import { OrderController } from 'src/adapter/driver/api/controllers/order.controller';
import { GetOrderByIdApplication } from 'src/core/Order/application/getOrderById.application';
import { Order } from 'src/core/Order/domain/entities/order.entity';
import { ORDER_TYPES } from 'src/core/Order/types';
// Order
const getOrderByIdApp = {
  provide: ORDER_TYPES.applications.IGetOrderByIdApplication,
  useClass: GetOrderByIdApplication,
};
const orderRepository = {
  provide: ORDER_TYPES.repositories.IOrderRepository,
  useClass: OrderRepository,
};

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [getOrderByIdApp, orderRepository],
})
export class OrderModule {}
