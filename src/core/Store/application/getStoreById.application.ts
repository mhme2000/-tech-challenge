import { Inject, Injectable } from '@nestjs/common';
import { IGetStoreByIdApplication } from './interfaces/getStoreById.interface';
import { STORE_TYPES } from './types';
import { IStoreRepository } from '../domain/repositories/interfaces/storeRepository.interface';
import { Store } from '../domain/entities/store.entity';

@Injectable()
export class GetStoreByIdApplication implements IGetStoreByIdApplication {
  constructor(
    @Inject(STORE_TYPES.repositories.IStoreRepository)
    private storeRepository: IStoreRepository,
  ) {}

  async getStoreById(id: string): Promise<Store> {
    return await this.storeRepository.getById(id);
  }
}
