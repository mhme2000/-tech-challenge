import { Customer } from "../../entities/customer.entity";

export interface ICustomerRepository {
  getById(customerId: string): Promise<Customer>;
  get(): Promise<Customer[]>;
  hardDelete(customer: Customer): Promise<void>;
  addOrUpdate(customer: Customer): Promise<Customer>;
}
