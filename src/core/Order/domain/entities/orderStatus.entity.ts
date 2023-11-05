import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatusEnum } from '../enums/orderStatus.enum';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.RECEIVED,
  })
  status: OrderStatusEnum;
}
