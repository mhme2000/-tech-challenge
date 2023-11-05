import {
  Controller,
  Get,
  Param,
  Inject,
  Res,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateCustomerApplication } from '../../../../core/Customer/application/interfaces/createCustomer.interface';
import { CUSTOMER_TYPES } from '../../../../core/Customer/types';
import { CustomerDTO } from '../../dtos/CustomerDTO.dto';
import { CustomerMapper } from '../../mappers/customerMapper.mapper';
import { IGetCustomerByDocumentApplication } from '../../../../core/Customer/application/interfaces/getCustomerByDocument.interface';

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
      const customerId = await this.createCustomerApplication.createCustomer(
        CustomerMapper.dtoToEntity(customerDto),
      );
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          id: customerId,
        },
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Get('/document/:document')
  public async GetByDocument(@Res() res, @Param('document') document: string) {
    try {
      const customer =
        await this.getCustomerByDocumentApplication.getByDocument(document);
      const statusCode = customer ? HttpStatus.CREATED : HttpStatus.NOT_FOUND;
      res.status(statusCode).json({
        statusCode: statusCode,
        data: customer,
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
