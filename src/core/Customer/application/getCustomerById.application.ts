import { Inject, Injectable } from '@nestjs/common';
import { IGetCustomerByIdApplication } from './interfaces/getCustomerById.interface';
import { CUSTOMER_TYPES } from './types';
import { ICustomerRepository } from '../domain/repositories/interfaces/customerRepository.interface';
import { Customer } from '../domain/entities/customer.entity';

@Injectable()
export class GetCustomerByIdApplication implements IGetCustomerByIdApplication {
  constructor(
    @Inject(CUSTOMER_TYPES.repositories.ICustomerRepository)
    private customerRepository: ICustomerRepository,
  ) { }

  async getCustomerById(id: string): Promise<Customer> {
    return await this.customerRepository.getById(id);
  }
}
