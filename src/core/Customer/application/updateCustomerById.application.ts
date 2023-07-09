import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_TYPES } from './types';
import { ICustomerRepository } from '../domain/repositories/interfaces/customerRepository.interface';
import { IUpdateCustomerByIdApplication } from './interfaces/updateCustomerById.interface';
import { Customer } from '../domain/entities/customer.entity';
import { AddOrUpdateCustomerDto } from '../domain/dtos/addOrUpdateCustomerDto';

@Injectable()
export class UpdateCustomerByIdApplication
  implements IUpdateCustomerByIdApplication
{
  constructor(
    @Inject(CUSTOMER_TYPES.repositories.ICustomerRepository)
    private customerRepository: ICustomerRepository,
  ) {}
  async updateCustomerById(
    customerDto: AddOrUpdateCustomerDto,
  ): Promise<Customer> {
    const customerOld = await this.customerRepository.getById(
      customerDto.customerId,
    );
    if (customerOld == null)
      throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
    const customer: Customer = {
      id: customerDto.customerId,
      name: customerDto.name,
      document: customerDto.document,
      creationDate: customerOld.creationDate,
    };
    return await this.customerRepository.addOrUpdate(customer);
  }
}
