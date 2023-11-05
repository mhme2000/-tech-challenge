import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_TYPES } from '../types';
import { ICustomerRepository } from '../domain/repositories/interfaces/customerRepository.interface';
import { Customer } from '../domain/entities/customer.entity';
import { IGetCustomerByDocumentApplication } from './interfaces/getCustomerByDocument.interface';

@Injectable()
export class GetCustomerByDocumentApplication
  implements IGetCustomerByDocumentApplication
{
  constructor(
    @Inject(CUSTOMER_TYPES.repositories.ICustomerRepository)
    private customerRepository: ICustomerRepository,
  ) {}

  async getByDocument(document: string): Promise<Customer> {
    return await this.customerRepository.getByDocument(document);
  }
}
