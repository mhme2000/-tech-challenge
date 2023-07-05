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
import { ICreateStoreApplication } from 'src/core/Store/application/interfaces/createStore.interface';
import { IDeleteStoreByIdApplication } from 'src/core/Store/application/interfaces/deleteStoreById.interface';
import { IGetAllStoresApplication } from 'src/core/Store/application/interfaces/getAllStores.interface';
import { IGetStoreByIdApplication } from 'src/core/Store/application/interfaces/getStoreById.interface';
import { IUpdateStoreByIdApplication } from 'src/core/Store/application/interfaces/updateStoreById.interface';
import { AddOrUpdateStoreDto } from 'src/core/Store/domain/dtos/addOrUpdateStoreDto';
@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(
    @Inject('IGetStoreByIdApplication')
    private getStoreByIdApp: IGetStoreByIdApplication,
    @Inject('IGetAllStoresApplication')
    private getAllStoresApp: IGetAllStoresApplication,
    @Inject('IDeleteStoreByIdApplication')
    private deleteStoreByIdApp: IDeleteStoreByIdApplication,
    @Inject('IUpdateStoreByIdApplication')
    private updateStoreByIdApp: IUpdateStoreByIdApplication,
    @Inject('ICreateStoreApplication')
    private createStoreApp: ICreateStoreApplication,
  ) {}

  @Get('/:id')
  public async GetById(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) storeId: string,
  ) {
    try {
      const store = await this.getStoreByIdApp.getStoreById(storeId);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: store,
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
      const stores = await this.getAllStoresApp.getAllStores();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: stores,
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
    @Param('id', new ParseUUIDPipe({ version: '4' })) storeId: string,
  ) {
    try {
      await this.deleteStoreByIdApp.deleteStoreById(storeId);
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
    @Param('id', new ParseUUIDPipe({ version: '4' })) storeId: string,
    @Body() storeDto: AddOrUpdateStoreDto,
  ) {
    try {
      storeDto.storeId = storeId;
      const store = await this.updateStoreByIdApp.updateStoreById(storeDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: store,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }

  @Post()
  public async Create(@Res() res, @Body() storeDto: AddOrUpdateStoreDto) {
    try {
      const store = await this.createStoreApp.createStore(storeDto);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: store,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
