import { Stock } from '../../../core/Stock/domain/entities/stock.entity';
import { EntitySchema } from 'typeorm';

export const StockSchema = new EntitySchema<Stock>({
  name: 'stock',
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
    quantity: {
      name: 'quantity',
      type: Number,
    },
    productId: {
      name: 'product_id',
      type: String,
    },
  },
});
