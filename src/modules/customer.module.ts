import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/adapter/driven/infra/repositories/customer.repository';
import { CustomerController } from 'src/adapter/driver/api/controllers/customer.controller';
import { CreateCustomerApplication } from 'src/core/Customer/application/createCustomer.application';
import { DeleteCustomerByIdApplication } from 'src/core/Customer/application/deleteCustomerById.application';
import { GetAllCustomersApplication } from 'src/core/Customer/application/getAllCustomers.application';
import { GetCustomerByIdApplication } from 'src/core/Customer/application/getCustomerById.application';
import { CUSTOMER_TYPES } from 'src/core/Customer/application/types';
import { UpdateCustomerByIdApplication } from 'src/core/Customer/application/updateCustomerById.application';
import { Customer } from 'src/core/Customer/domain/entities/customer.entity';
// Customer
const getCustomerByIdApp = {
  provide: CUSTOMER_TYPES.applications.IGetCustomerByIdApplication,
  useClass: GetCustomerByIdApplication,
};
const getAllCustomersApp = {
  provide: CUSTOMER_TYPES.applications.IGetAllCustomersApplication,
  useClass: GetAllCustomersApplication,
};
const deleteCustomerByIdApp = {
  provide: CUSTOMER_TYPES.applications.IDeleteCustomerByIdApplication,
  useClass: DeleteCustomerByIdApplication,
};
const updateCustomerByIdApp = {
  provide: CUSTOMER_TYPES.applications.IUpdateCustomerByIdApplication,
  useClass: UpdateCustomerByIdApplication,
};
const createCustomerApp = {
  provide: CUSTOMER_TYPES.applications.ICreateCustomerApplication,
  useClass: CreateCustomerApplication,
};
const customerRepository = {
  provide: CUSTOMER_TYPES.repositories.ICustomerRepository,
  useClass: CustomerRepository,
};

@Module({
  controllers: [CustomerController],
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    getCustomerByIdApp,
    getAllCustomersApp,
    deleteCustomerByIdApp,
    updateCustomerByIdApp,
    createCustomerApp,
    customerRepository,
  ],
})
export class CustomerModule {}
