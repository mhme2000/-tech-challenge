import { AddOrUpdateCustomerDto } from '../../domain/dtos/addOrUpdateCustomerDto';
import { Customer } from '../../domain/entities/customer.entity';

export interface IUpdateCustomerByIdApplication {
  updateCustomerById(customer: AddOrUpdateCustomerDto): Promise<Customer>;
}
