import { Customer } from 'src/core/Customer/domain/entities/customer.entity';
import { CustomerDTO } from '../dtos/CustomerDTO.dto';

function dtoToEntity(dto: CustomerDTO): Partial<Customer> {
  return {
    document: dto.document,
    email: dto.email,
    name: dto.name,
    creationDate: new Date(),
  };
}

function entityToDTO(entity: Customer): CustomerDTO {
  return {
    name: entity.name,
    email: entity.email,
    document: entity.document,
  };
}

export const CustomerMapper = {
  dtoToEntity,
  entityToDTO,
};
