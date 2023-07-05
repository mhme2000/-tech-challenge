import { AddOrUpdateCustomerDto } from '../../domain/dtos/addOrUpdateCustomerDto';
import { Customer } from '../../domain/entities/customer.entity';

export interface ICreateCustomerApplication {
  createCustomer(customer: AddOrUpdateCustomerDto): Promise<Customer>;
}
