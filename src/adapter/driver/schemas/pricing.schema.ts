import { Pricing } from '../../../core/Pricing/domain/entities/pricing.entity';
import { EntitySchema } from 'typeorm';

export const PricingSchema = new EntitySchema<Pricing>({
  name: 'pricing',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    storeId: {
      name: 'store_id',
      primary: true,
      type: String,
    },
    price: {
      name: 'total_price',
      type: 'decimal',
      precision: 3,
      scale: 2,
      nullable: false,
    },
    productId: {
      name: 'product_id',
      type: String,
    },
  },
});
