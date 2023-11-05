import { EntitySchema } from 'typeorm';
import { Store } from '../../../core/Store/domain/entities/store.entity';

export const StoreSchema = new EntitySchema<Store>({
  name: 'store',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      name: 'name',
      type: String,
    },
    description: {
      name: 'description',
      type: String,
    },
    creationDate: {
      name: 'creation_date',
      type: Date,
    },
  },
});
