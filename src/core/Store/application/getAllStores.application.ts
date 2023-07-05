import { Inject, Injectable } from '@nestjs/common';
import { STORE_TYPES } from './types';
import { IStoreRepository } from '../domain/repositories/interfaces/storeRepository.interface';
import { Store } from '../domain/entities/store.entity';
import { IGetAllStoresApplication } from './interfaces/getAllStores.interface';

@Injectable()
export class GetAllStoresApplication implements IGetAllStoresApplication {
  constructor(
    @Inject(STORE_TYPES.repositories.IStoreRepository)
    private storeRepository: IStoreRepository,
  ) {}
  async getAllStores(): Promise<Store[]> {
    return await this.storeRepository.get();
  }
}
