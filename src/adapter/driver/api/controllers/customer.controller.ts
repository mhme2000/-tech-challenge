import {
  Controller,
  Get,
  Param,
  Inject,
  Res,
  HttpStatus,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateCustomerApplication } from '../../../../core/Customer/application/interfaces/createCustomer.interface';
import { CUSTOMER_TYPES } from 'src/core/Customer/types';
import { CustomerDTO } from '../../dtos/CustomerDTO.dto';
import { CustomerMapper } from '../../mappers/customerMapper.mapper';
import { IGetCustomerByDocumentApplication } from 'src/core/Customer/application/interfaces/getCustomerByDocument.interface';
import { OrderStatusEnum } from 'src/core/Order/domain/enums/orderStatus.enum';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(CUSTOMER_TYPES.applications.ICreateCustomerApplication)
    private createCustomerApplication: ICreateCustomerApplication,
    
    @Inject(CUSTOMER_TYPES.applications.IGetCustomerByDocumentApplication)
    private getCustomerByDocumentApplication: IGetCustomerByDocumentApplication,
  ) {}

  @Post()
  public async Create(@Res() res, @Body() customerDto: CustomerDTO) {
    try {
      const customerId = await this.createCustomerApplication.createCustomer(CustomerMapper.dtoToEntity(customerDto));
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          id: customerId
        }
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Get()
  @Patch('/document/{document}')
  public async GetByDocument(@Res() res, @Param('document') document: string) {
    try {
      const customer = await this.getCustomerByDocumentApplication.getByDocument(document);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: customer
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
