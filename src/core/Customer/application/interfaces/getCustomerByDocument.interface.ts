import { Customer } from '../../domain/entities/customer.entity';

export interface IGetCustomerByDocumentApplication {
  getByDocument(document: string): Promise<Customer>;
}
