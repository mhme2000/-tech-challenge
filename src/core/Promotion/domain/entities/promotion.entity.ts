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
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  startDate: Date;

  @Column({
    name: 'start_date',
    type: 'timestamp',
    default: () => null,
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: DiscountTypeEnum,
    default: DiscountTypeEnum.CURRENCY,
  })
  discountType: DiscountTypeEnum;

  @Column({ name: 'total_price', type: 'decimal', nullable: false })
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
