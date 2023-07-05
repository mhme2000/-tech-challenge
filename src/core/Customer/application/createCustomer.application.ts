import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_TYPES } from './types';
import { ICustomerRepository } from '../domain/repositories/interfaces/customerRepository.interface';
import { Customer } from '../domain/entities/customer.entity';
import { ICreateCustomerApplication } from './interfaces/createCustomer.interface';
import { AddOrUpdateCustomerDto } from '../domain/dtos/addOrUpdateCustomerDto';

@Injectable()
export class CreateCustomerApplication implements ICreateCustomerApplication {
  constructor(
    @Inject(CUSTOMER_TYPES.repositories.ICustomerRepository)
    private customerRepository: ICustomerRepository,
  ) {}
  async createCustomer(customerDto: AddOrUpdateCustomerDto): Promise<Customer> {
    const customer: Customer = {
      name: customerDto.name,
      document: customerDto.document,
    };
    return await this.customerRepository.addOrUpdate(customer);
  }
}
