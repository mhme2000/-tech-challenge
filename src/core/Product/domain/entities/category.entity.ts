import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'store_id' })
  storeId: string;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({ name: 'product_id' })
  productId: string;
}
