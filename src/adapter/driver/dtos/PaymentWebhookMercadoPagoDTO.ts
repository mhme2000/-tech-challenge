import { ApiProperty } from '@nestjs/swagger';
import { MercadoPagoPaymentStatusEnum } from '../enum/MercadoPagoPaymentStatus.enum';
import { IsEnum } from 'class-validator';

export class PaymentWebhookMercadoPagoDTO {
  @ApiProperty({
    type: String,
  })
  id: string;

  @IsEnum(MercadoPagoPaymentStatusEnum)
  @ApiProperty({
    enum: MercadoPagoPaymentStatusEnum,
    examples: Object.keys(MercadoPagoPaymentStatusEnum),
  })
  status: MercadoPagoPaymentStatusEnum;
}
