import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../../../core/Customer/domain/entities/customer.entity';
import { ICustomerRepository } from '../../../..//core/Customer/domain/repositories/interfaces/customerRepository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {}
  async getById(customerId: string): Promise<Customer> {
    return await this.repository.findOne({
      where: {
        id: customerId,
      },
    });
  }
  async get(): Promise<Customer[]> {
    return await this.repository.find({});
  }
  async hardDelete(customer: Customer): Promise<void> {
    await this.repository.remove(customer);
  }
  async addOrUpdate(customer: Customer): Promise<Customer> {
    return await this.repository.save(customer);
  }
}
