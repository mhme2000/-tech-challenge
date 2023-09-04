import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../../../core/Customer/domain/entities/customer.entity';
import { ICustomerRepository } from '../../../..//core/Customer/domain/repositories/interfaces/customerRepository.interface';
import { Repository } from 'typeorm';
import { CustomerSchema } from '../../../driver/schemas/customer.schema';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerSchema)
    private customerRepository: Repository<Customer>,
  ) {}

  async getByDocument(document: string): Promise<Customer> {
    return await this.customerRepository.findOneBy({ document });
  }

  async create(customer: Partial<Customer>): Promise<string> {
    const newCustomer = this.customerRepository.create(customer);
    const savedCustomer = await this.customerRepository.save(newCustomer);
    return savedCustomer.id;
  }
}
