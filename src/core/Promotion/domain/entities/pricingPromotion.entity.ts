import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PricingPromotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'pricing_id' })
  pricingId: string;

  @Column({ name: 'promotion_id' })
  promotionId: string;
}
