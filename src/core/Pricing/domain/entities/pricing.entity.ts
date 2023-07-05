import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pricing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'store_id' })
  storeId: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'total_price', type: "decimal", precision: 3, scale: 2, nullable: false })
  price: number;
}
