import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './orderStatus.entity';
import { OrderItem } from './orderItem.entity';

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
  orderItems: OrderItem[];

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;


  @CreateDateColumn({ name:'prevision_delivery_date' })
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
