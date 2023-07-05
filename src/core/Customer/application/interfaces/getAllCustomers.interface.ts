import { Customer } from '../../domain/entities/customer.entity';

export interface IGetAllCustomersApplication {
  getAllCustomers(): Promise<Customer[]>;
}
