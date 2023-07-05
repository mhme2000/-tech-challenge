import {
  Controller,
  Get,
  Param,
  Inject,
  ParseUUIDPipe,
  Res,
  HttpStatus,
  Delete,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateCustomerApplication } from 'src/core/Customer/application/interfaces/createCustomer.interface';
import { IDeleteCustomerByIdApplication } from 'src/core/Customer/application/interfaces/deleteCustomerById.interface';
import { IGetAllCustomersApplication } from 'src/core/Customer/application/interfaces/getAllCustomers.interface';
import { IGetCustomerByIdApplication } from 'src/core/Customer/application/interfaces/getCustomerById.interface';
import { IUpdateCustomerByIdApplication } from 'src/core/Customer/application/interfaces/updateCustomerById.interface';
import { AddOrUpdateCustomerDto } from 'src/core/Customer/domain/dtos/addOrUpdateCustomerDto';
@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(
    @Inject('IGetCustomerByIdApplication')
    private getCustomerByIdApp: IGetCustomerByIdApplication,
    @Inject('IGetAllCustomersApplication')
    private getAllCustomersApp: IGetAllCustomersApplication,
    @Inject('IDeleteCustomerByIdApplication')
    private deleteCustomerByIdApp: IDeleteCustomerByIdApplication,
    @Inject('IUpdateCustomerByIdApplication')
    private updateCustomerByIdApp: IUpdateCustomerByIdApplication,
    @Inject('ICreateCustomerApplication')
    private createCustomerApp: ICreateCustomerApplication,
  ) { }

  @Get('/:id')
  public async GetById(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) customerId: string,
  ) {
    try {
      const customer = await this.getCustomerByIdApp.getCustomerById(customerId);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: customer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Get()
  public async Get(@Res() res) {
    try {
      const customers = await this.getAllCustomersApp.getAllCustomers();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: customers,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Delete('/:id')
  public async Delete(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) customerId: string,
  ) {
    try {
      await this.deleteCustomerByIdApp.deleteCustomerById(customerId);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: null,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Put('/:id')
  public async Update(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) customerId: string,
    @Body() customerDto: AddOrUpdateCustomerDto,
  ) {
    try {
      customerDto.customerId = customerId;
      const customer = await this.updateCustomerByIdApp.updateCustomerById(
        customerDto,
      );
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: customer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Post()
  public async Create(@Res() res, @Body() customerDto: AddOrUpdateCustomerDto) {
    try {
      const customer = await this.createCustomerApp.createCustomer(customerDto);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: customer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
