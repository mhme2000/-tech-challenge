import { ApiProperty } from '@nestjs/swagger';
import { MercadoPagoPaymentStatusEnum } from '../enum/MercadoPagoPaymentStatus.enum';

export class PaymentWebhookMercadoPagoDTO {
  @ApiProperty({
    type: String,
  })
  id: string;
  @ApiProperty({ enum: MercadoPagoPaymentStatusEnum })
  status: MercadoPagoPaymentStatusEnum;
}
