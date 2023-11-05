import { Customer } from '../../domain/entities/customer.entity';

export interface ICreateCustomerApplication {
  createCustomer(customer: Partial<Customer>): Promise<string>;
}
