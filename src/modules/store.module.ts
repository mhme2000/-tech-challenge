import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from '../adapter/driven/infra/repositories/store.repository';
import { StoreController } from '../adapter/driver/api/controllers/store.controller';
import { CreateStoreApplication } from '../core/Store/application/createStore.application';
import { DeleteStoreByIdApplication } from '../core/Store/application/deleteStoreById.application';
import { GetAllStoresApplication } from '../core/Store/application/getAllStores.application';
import { GetStoreByIdApplication } from '../core/Store/application/getStoreById.application';
import { STORE_TYPES } from '../core/Store/application/types';
import { UpdateStoreByIdApplication } from '../core/Store/application/updateStoreById.application';
import { StoreSchema } from '../adapter/driver/schemas/store.schema';
// Store
const getStoreByIdApp = {
  provide: STORE_TYPES.applications.IGetStoreByIdApplication,
  useClass: GetStoreByIdApplication,
};
const getAllStoresApp = {
  provide: STORE_TYPES.applications.IGetAllStoresApplication,
  useClass: GetAllStoresApplication,
};
const deleteStoreByIdApp = {
  provide: STORE_TYPES.applications.IDeleteStoreByIdApplication,
  useClass: DeleteStoreByIdApplication,
};
const updateStoreByIdApp = {
  provide: STORE_TYPES.applications.IUpdateStoreByIdApplication,
  useClass: UpdateStoreByIdApplication,
};
const createStoreApp = {
  provide: STORE_TYPES.applications.ICreateStoreApplication,
  useClass: CreateStoreApplication,
};
const storeRepository = {
  provide: STORE_TYPES.repositories.IStoreRepository,
  useClass: StoreRepository,
};

@Module({
  controllers: [StoreController],
  imports: [TypeOrmModule.forFeature([StoreSchema])],
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
