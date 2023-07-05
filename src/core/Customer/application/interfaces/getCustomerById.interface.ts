import { Customer } from '../../domain/entities/customer.entity';

export interface IGetCustomerByIdApplication {
  getCustomerById(customerId: string): Promise<Customer>;
}
