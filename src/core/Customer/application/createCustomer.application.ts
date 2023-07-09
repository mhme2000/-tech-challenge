import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_TYPES } from '../types';
import { ICustomerRepository } from '../domain/repositories/interfaces/customerRepository.interface';
import { Customer } from '../domain/entities/customer.entity';
import { ICreateCustomerApplication } from './interfaces/createCustomer.interface';

@Injectable()
export class CreateCustomerApplication implements ICreateCustomerApplication {
  constructor(
    @Inject(CUSTOMER_TYPES.repositories.ICustomerRepository)
    private customerRepository: ICustomerRepository,
  ) {}

  async createCustomer(customer: Partial<Customer>): Promise<string> {
    return await this.customerRepository.create(customer);
  }
}
