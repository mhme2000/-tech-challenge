import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_TYPES } from './types';
import { ICustomerRepository } from '../domain/repositories/interfaces/customerRepository.interface';
import { Customer } from '../domain/entities/customer.entity';
import { IGetAllCustomersApplication } from './interfaces/getAllCustomers.interface';

@Injectable()
export class GetAllCustomersApplication implements IGetAllCustomersApplication {
  constructor(
    @Inject(CUSTOMER_TYPES.repositories.ICustomerRepository)
    private customerRepository: ICustomerRepository,
  ) { }
  async getAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.get();
  }
}
