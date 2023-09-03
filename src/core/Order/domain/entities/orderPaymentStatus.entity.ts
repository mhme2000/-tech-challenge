import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderPaymentStatusEnum } from '../enums/paymentStatus.enum';

@Entity()
export class OrderPaymentStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    enum: OrderPaymentStatusEnum,
    default: OrderPaymentStatusEnum.PENDING,
  })
  status: OrderPaymentStatusEnum;
}
