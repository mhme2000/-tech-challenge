import { Customer } from '../../entities/customer.entity';

export interface ICustomerRepository {
  create(customer: Partial<Customer>): Promise<string>;
  getByDocument(document: string): Promise<Customer>;
}
