import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../adapter/driven/infra/repositories/customer.repository';
import { CustomerController } from '../adapter/driver/api/controllers/customer.controller';
import { CreateCustomerApplication } from '../core/Customer/application/createCustomer.application';

import { CUSTOMER_TYPES } from '../core/Customer/types';
import { GetCustomerByDocumentApplication } from '../core/Customer/application/getCustomerByDocument.application';
import { CustomerSchema } from '../adapter/driver/schemas/customer.schema';

// Customer
const createCustomerApp = {
  provide: CUSTOMER_TYPES.applications.ICreateCustomerApplication,
  useClass: CreateCustomerApplication,
};

const getCustomerByDocumentApp = {
  provide: CUSTOMER_TYPES.applications.IGetCustomerByDocumentApplication,
  useClass: GetCustomerByDocumentApplication,
};
const customerRepository = {
  provide: CUSTOMER_TYPES.repositories.ICustomerRepository,
  useClass: CustomerRepository,
};

@Module({
  controllers: [CustomerController],
  imports: [TypeOrmModule.forFeature([CustomerSchema])],
  providers: [createCustomerApp, getCustomerByDocumentApp, customerRepository],
})
export class CustomerModule {}
