import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountTypeEnum } from '../enums/discountType.enum';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'store_id' })
  storeId: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({
    name: 'start_date',
    type: 'timestamp',
    nullable: false,
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'timestamp',
    nullable: false,
  })
  endDate: Date;

  @Column({
    type: 'text',
    name: 'discount_type',
    enum: DiscountTypeEnum,
    default: DiscountTypeEnum.CURRENCY,
  })
  discountType: DiscountTypeEnum;

  @Column({ name: 'discount_value', type: 'decimal', nullable: false })
  discountValue: number;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 3,
    scale: 2,
    nullable: false,
  })
  price: number;
}
