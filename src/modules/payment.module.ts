import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from 'src/adapter/driven/infra/repositories/order.repository';
import { PaymentController } from 'src/adapter/driver/api/controllers/payment.controller';
import { GetOrderByExternalPaymentIdApplication } from 'src/core/Order/application/getOrderByExternalPaymentId.application';
import { UpdateOrderPaymentStatus } from 'src/core/Order/application/updateOrderPaymentStatus.application';
import { UpdateOrderStatus } from 'src/core/Order/application/updateOrderStatus.application';
import { Order } from 'src/core/Order/domain/entities/order.entity';
import { OrderItem } from 'src/core/Order/domain/entities/orderItem.entity';
import { OrderStatus } from 'src/core/Order/domain/entities/orderStatus.entity';
import { ORDER_TYPES } from 'src/core/Order/types';

const getOrderByExternalPaymentId = {
  provide: ORDER_TYPES.applications.IGetOrderByExternalPaymentId,
  useClass: GetOrderByExternalPaymentIdApplication,
};

const orderRepository = {
  provide: ORDER_TYPES.repositories.IOrderRepository,
  useClass: OrderRepository,
};

const updateOrderPaymentStatus = {
  provide: ORDER_TYPES.applications.IUpdateOrderPaymentStatus,
  useClass: UpdateOrderPaymentStatus,
};

const updateOrderStatus = {
  provide: ORDER_TYPES.applications.IUpdateOrderStatus,
  useClass: UpdateOrderStatus,
};

@Module({
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([Order, OrderStatus, OrderItem])],
  providers: [
    getOrderByExternalPaymentId,
    orderRepository,
    updateOrderPaymentStatus,
    updateOrderStatus,
  ],
})
export class PaymentModule {}
