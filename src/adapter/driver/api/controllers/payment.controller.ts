import {
  Controller,
  Inject,
  Res,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ORDER_TYPES } from '../../../../core/Order/types';
import { PaymentWebhookMercadoPagoDTO } from '../../dtos/PaymentWebhookMercadoPagoDTO';
import { MercadoPagoPaymentStatusEnum } from '../../enum/MercadoPagoPaymentStatus.enum';
import { OrderStatusEnum } from 'src/core/Order/domain/enums/orderStatus.enum';
import { OrderPaymentStatusEnum } from 'src/core/Order/domain/enums/paymentStatus.enum';
import { IUpdateOrderPaymentStatus } from 'src/core/Order/application/interfaces/updateOrderPaymentStatus.interface';
import { IUpdateOrderStatus } from 'src/core/Order/application/interfaces/updateOrderStatus.interface';
import { IGetOrderByExternalPaymentId } from 'src/core/Order/application/interfaces/getOrderByExternalPaymentId.interface';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(ORDER_TYPES.applications.IGetOrderByExternalPaymentId)
    private getOrderByExternalPaymentIdApp: IGetOrderByExternalPaymentId,
    @Inject(ORDER_TYPES.applications.IUpdateOrderPaymentStatus)
    private updateOrderPaymentStatus: IUpdateOrderPaymentStatus,
    @Inject(ORDER_TYPES.applications.IUpdateOrderStatus)
    private updateOrderStatus: IUpdateOrderStatus,
  ) {}

  @Post('/webhooks/provider/mercadopago')
  public async PostPaymentStatus(
    @Res() res,
    @Body() mercadoPagoProviderDTO: PaymentWebhookMercadoPagoDTO,
  ) {
    try {
      const order =
        await this.getOrderByExternalPaymentIdApp.getOrderByExternalPaymentId(
          mercadoPagoProviderDTO.id,
        );

      let orderPaymentStatus: OrderPaymentStatusEnum;
      let orderStatus: OrderStatusEnum;

      if (
        [
          MercadoPagoPaymentStatusEnum.Inprocess,
          MercadoPagoPaymentStatusEnum.Pending,
        ].includes(mercadoPagoProviderDTO.status)
      ) {
        orderPaymentStatus = OrderPaymentStatusEnum.PENDING;
        orderStatus = OrderStatusEnum.PENDING_PAYMENT;
      } else if (
        [MercadoPagoPaymentStatusEnum.Approved].includes(
          mercadoPagoProviderDTO.status,
        )
      ) {
        orderPaymentStatus = OrderPaymentStatusEnum.SUCCESS;
        orderStatus = OrderStatusEnum.IN_PREPARATION;
      } else {
        orderPaymentStatus = OrderPaymentStatusEnum.FAILURE;
        orderStatus = OrderStatusEnum.CANCELED;
      }

      await this.updateOrderPaymentStatus.updateOrderPaymentStatus(
        order.id,
        orderPaymentStatus,
      );
      await this.updateOrderStatus.updateOrderStatus(order.id, orderStatus);

      return res.status(HttpStatus.OK).send();
    } catch (err) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: err,
        })
        .send();
    }
  }
}
