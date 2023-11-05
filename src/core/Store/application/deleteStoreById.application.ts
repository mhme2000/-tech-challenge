import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { STORE_TYPES } from './types';
import { IStoreRepository } from '../domain/repositories/interfaces/storeRepository.interface';
import { IDeleteStoreByIdApplication } from './interfaces/deleteStoreById.interface';

@Injectable()
export class DeleteStoreByIdApplication implements IDeleteStoreByIdApplication {
  constructor(
    @Inject(STORE_TYPES.repositories.IStoreRepository)
    private storeRepository: IStoreRepository,
  ) {}
  async deleteStoreById(storeId: string): Promise<void> {
    const store = await this.storeRepository.getById(storeId);
    if (store == null)
      throw new HttpException('Store not found.', HttpStatus.NOT_FOUND);
    await this.storeRepository.hardDelete(store);
  }
}
