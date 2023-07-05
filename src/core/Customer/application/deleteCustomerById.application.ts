import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_TYPES } from './types';
import { ICustomerRepository } from '../domain/repositories/interfaces/customerRepository.interface';
import { IDeleteCustomerByIdApplication } from './interfaces/deleteCustomerById.interface';

@Injectable()
export class DeleteCustomerByIdApplication
  implements IDeleteCustomerByIdApplication {
  constructor(
    @Inject(CUSTOMER_TYPES.repositories.ICustomerRepository)
    private customerRepository: ICustomerRepository,
  ) { }
  async deleteCustomerById(customerId: string): Promise<void> {
    const customer = await this.customerRepository.getById(customerId);
    if (customer == null)
      throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
    await this.customerRepository.hardDelete(customer);
  }
}
