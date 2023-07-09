import {
  Controller,
  Get,
  Param,
  Inject,
  ParseUUIDPipe,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IGetOrderByIdApplication } from '../../../../core/Order/application/interfaces/getOrderById.interface';
import { ORDER_TYPES } from 'src/core/Order/types';
import { IGetOrdersByStoreIdAndStatus } from 'src/core/Order/application/interfaces/getOrdersByStoreIdAndStatus.interface';
import { IGetOrdersByStoreId } from 'src/core/Order/application/interfaces/getOrdersByStoreId.interface';
import { OrderStatusEnum } from 'src/core/Order/domain/enums/orderStatus.enum';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    @Inject(ORDER_TYPES.applications.IGetOrderByIdApplication)
    private getOrderByIdApp: IGetOrderByIdApplication,

    @Inject(ORDER_TYPES.applications.IGetOrdersByStoreId)
    private getOrderByStoreId: IGetOrdersByStoreId,

    @Inject(ORDER_TYPES.applications.IGetOrdersByStoreIdAndStatus)
    private getOrderByStoreIdAndStatus: IGetOrdersByStoreIdAndStatus,
  ) {}

  @Get('/:id')
  public async Get(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) orderId: string,
  ) {
    try {
      const order = await this.getOrderByIdApp.getOrderById(orderId);
      const statusCode = order ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      return res.status(statusCode).json({
        statusCode: statusCode,
        data: order,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Get('/store/:storeId')
  public async GetByStoreId(
    @Res() res,
    @Param('storeId', new ParseUUIDPipe({ version: '4' })) storeId: string,
  ) {
    try {
      const orders = await this.getOrderByStoreId.getByStoreId(storeId);
      const statusCode =
        orders.length > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      return res.status(statusCode).json({
        statusCode: statusCode,
        data: orders,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Get('/store/:storeId/status/:status')
  public async GetByStoreIdAndStatus(
    @Res() res,
    @Param('storeId', new ParseUUIDPipe({ version: '4' })) storeId: string,
    @Param('status') status: OrderStatusEnum,
  ) {
    try {
      const orders =
        await this.getOrderByStoreIdAndStatus.getByStoreIdAndStatus(
          storeId,
          status,
        );
      const statusCode =
        orders.length > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      return res.status(statusCode).json({
        statusCode: statusCode,
        data: orders,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
