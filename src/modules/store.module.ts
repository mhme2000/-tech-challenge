import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from 'src/adapter/driven/infra/repositories/store.repository';
import { StoreController } from 'src/adapter/driver/api/controllers/store.controller';
import { CreateStoreApplication } from 'src/core/Store/application/createStore.application';
import { DeleteStoreByIdApplication } from 'src/core/Store/application/deleteStoreById.application';
import { GetAllStoresApplication } from 'src/core/Store/application/getAllStores.application';
import { GetStoreByIdApplication } from 'src/core/Store/application/getStoreById.application';
import { PRODUCT_TYPES } from 'src/core/Store/application/types';
import { UpdateStoreByIdApplication } from 'src/core/Store/application/updateStoreById.application';
import { Store } from 'src/core/Store/domain/entities/store.entity';
// Store
const getStoreByIdApp = {
  provide: PRODUCT_TYPES.applications.IGetStoreByIdApplication,
  useClass: GetStoreByIdApplication,
};
const getAllStoresApp = {
  provide: PRODUCT_TYPES.applications.IGetAllStoresApplication,
  useClass: GetAllStoresApplication,
};
const deleteStoreByIdApp = {
  provide: PRODUCT_TYPES.applications.IDeleteStoreByIdApplication,
  useClass: DeleteStoreByIdApplication,
};
const updateStoreByIdApp = {
  provide: PRODUCT_TYPES.applications.IUpdateStoreByIdApplication,
  useClass: UpdateStoreByIdApplication,
};
const createStoreApp = {
  provide: PRODUCT_TYPES.applications.ICreateStoreApplication,
  useClass: CreateStoreApplication,
};
const storeRepository = {
  provide: PRODUCT_TYPES.repositories.IStoreRepository,
  useClass: StoreRepository,
};

@Module({
  controllers: [StoreController],
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [
    getStoreByIdApp,
    getAllStoresApp,
    deleteStoreByIdApp,
    updateStoreByIdApp,
    createStoreApp,
    storeRepository,
  ],
})
export class StoreModule {}
