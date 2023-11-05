import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { STORE_TYPES } from './types';
import { IStoreRepository } from '../domain/repositories/interfaces/storeRepository.interface';
import { IUpdateStoreByIdApplication } from './interfaces/updateStoreById.interface';
import { Store } from '../domain/entities/store.entity';
import { AddOrUpdateStoreDto } from '../domain/dtos/addOrUpdateStoreDto';

@Injectable()
export class UpdateStoreByIdApplication implements IUpdateStoreByIdApplication {
  constructor(
    @Inject(STORE_TYPES.repositories.IStoreRepository)
    private storeRepository: IStoreRepository,
  ) {}
  async updateStoreById(storeDto: AddOrUpdateStoreDto): Promise<Store> {
    const storeOld = await this.storeRepository.getById(storeDto.storeId);
    if (storeOld == null)
      throw new HttpException('Store not found.', HttpStatus.NOT_FOUND);
    const store: Store = {
      id: storeDto.storeId,
      name: storeDto.name,
      description: storeDto.description,
      creationDate: storeOld.creationDate,
    };
    return await this.storeRepository.addOrUpdate(store);
  }
}
