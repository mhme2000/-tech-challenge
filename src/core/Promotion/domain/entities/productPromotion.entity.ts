import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductPromotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'promotion_id' })
  promotionId: string;
}
