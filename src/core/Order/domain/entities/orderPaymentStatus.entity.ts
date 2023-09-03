import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentStatusEnum } from '../enums/paymentStatus.enum';

@Entity()
export class OrderPaymentStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  status: PaymentStatusEnum;
}
