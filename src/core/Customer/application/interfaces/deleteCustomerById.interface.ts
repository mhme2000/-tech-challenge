export interface IDeleteCustomerByIdApplication {
  deleteCustomerById(customerId: string): Promise<void>;
}
