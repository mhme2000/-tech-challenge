import { EntitySchema } from 'typeorm';
import { Customer } from '../../../core/Customer/domain/entities/customer.entity';

export const CustomerSchema = new EntitySchema<Customer>({
  name: 'customer',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    email: {
      name: 'email',
      nullable: false,
      primary: true,
      type: String,
    },
    document: {
      name: 'document',
      nullable: false,
      primary: true,
      type: String,
    },
    creationDate: {
      name: 'creation_date',
      type: Date,
      nullable: false,
    },
    name: {
      name: 'name',
      type: String,
      nullable: false,
    },
  },
});
