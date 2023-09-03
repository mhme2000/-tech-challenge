import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './orderStatus.entity';
import { OrderItem } from './orderItem.entity';
import { OrderPaymentStatus } from './orderPaymentStatus.entity';
import { OrderPaymentStatusEnum } from '../enums/paymentStatus.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'store_id' })
  storeId: string;

  @PrimaryColumn({ name: 'customer_id' })
  customerId: string;

  @ManyToOne(() => OrderStatus, (orderStatus: OrderStatus) => orderStatus.id)
  @JoinColumn({ name: 'status_id' })
  statusId: OrderStatus;

  @JoinColumn()
  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.orderId)
  orderItems?: OrderItem[];

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;

  @PrimaryColumn({ name: 'external_payment_id' })
  externalPaymentId: string;

  @Column({
    type: 'text',
    enum: OrderPaymentStatusEnum,
    default: OrderPaymentStatusEnum.PENDING,
  })
  paymentStatus: OrderPaymentStatusEnum;
  
  @CreateDateColumn({ name: 'prevision_delivery_date' })
  previsionDeliveryDate: Date;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
  })
  totalPrice: number;
}
