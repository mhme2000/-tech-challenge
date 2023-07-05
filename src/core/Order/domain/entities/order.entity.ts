import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from './orderStatus.entity';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn()
  @OneToOne(() => OrderStatus) 
  status: OrderStatus;

  @JoinColumn()
  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.orderId) 
  orderItems: OrderItem[]

  @Column({
    name: 'status',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({ name: 'prevision_delivery_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP' 
  })
  previsionDeliveryDate: Date;

  @Column({ name: 'total_price', type: "decimal", precision: 3, scale: 2, nullable: false })
  totalPrice: number;

}
