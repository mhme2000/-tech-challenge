import {
  Controller,
  Get,
  Param,
  Inject,
  ParseUUIDPipe,
  Res,
  HttpStatus,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IGetOrderByIdApplication } from '../../../../core/Order/application/interfaces/getOrderById.interface';
import { ORDER_TYPES } from '../../../../core/Order/types';
import { IGetOrdersByStoreId } from '../../../../core/Order/application/interfaces/getOrdersByStoreId.interface';
import { OrderStatusEnum } from '../../../../core/Order/domain/enums/orderStatus.enum';
import { IUpdateOrderStatus } from 'src/core/Order/application/interfaces/updateOrderStatus.interface';
import { OrderDTO } from '../../dtos/OrderDTO.dto';
import { IGetOrdersByStoreIdAndStatus } from 'src/core/Order/application/interfaces/getOrdersByStoreIdAndStatus.interface';
import { IPostOrder } from 'src/core/Order/application/interfaces/postOrder.interface';

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

    @Inject(ORDER_TYPES.applications.IUpdateOrderStatus)
    private putOrderStatusById: IUpdateOrderStatus,

    @Inject(ORDER_TYPES.applications.IPostOrder)
    private postOrder: IPostOrder,
  ) {}

  @Get('/:id')
  public async Get(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) orderId: string,
  ) {
    try {
      const order = await this.getOrderByIdApp.getOrderById(orderId);
      const statusCode = order ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      res.status(statusCode).json({
        statusCode: statusCode,
        data: order,
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
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
      res.status(statusCode).json({
        statusCode: statusCode,
        data: orders,
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
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

  @Put(':id/status/:status')
  public async PutStatusById(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) orderId: string,
    @Param('status') status: OrderStatusEnum,
  ) {
    try {
      await this.putOrderStatusById.updateOrderStatus(orderId, status);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Post()
  public async Create(@Res() res, @Body() orderDto: OrderDTO) {
    try {
      const orderId = await this.postOrder.postOrder(orderDto);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: orderId,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
