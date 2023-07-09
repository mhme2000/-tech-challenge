import { Inject, Injectable } from '@nestjs/common';
import { STORE_TYPES } from './types';
import { IStoreRepository } from '../domain/repositories/interfaces/storeRepository.interface';
import { Store } from '../domain/entities/store.entity';
import { ICreateStoreApplication } from './interfaces/createStore.interface';
import { AddOrUpdateStoreDto } from '../domain/dtos/addOrUpdateStoreDto';

@Injectable()
export class CreateStoreApplication implements ICreateStoreApplication {
  constructor(
    @Inject(STORE_TYPES.repositories.IStoreRepository)
    private storeRepository: IStoreRepository,
  ) {}
  async createStore(storeDto: AddOrUpdateStoreDto): Promise<Store> {
    const store: Store = {
      id: null,
      name: storeDto.name,
      description: storeDto.description,
      creationDate: new Date(),
    };
    return await this.storeRepository.addOrUpdate(store);
  }
}
