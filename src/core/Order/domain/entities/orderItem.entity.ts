import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    name: 'discount',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
  })
  discount: number;
}
