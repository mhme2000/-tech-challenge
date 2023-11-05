import { Inject, Injectable } from '@nestjs/common';

import { ORDER_TYPES } from '../types';
import { IPromotionRepository } from '../domain/repositories/interfaces/promotionRepository.interface';
import { IDeletePromotionsByStoreId } from './interfaces/deletePromotionsByStoreId.interface';

@Injectable()
export class DeletePromotionsByStoreId implements IDeletePromotionsByStoreId {
  constructor(
    @Inject(ORDER_TYPES.repositories.IPromotionRepository)
    private promotionRepository: IPromotionRepository,
  ) {}

  async delete(storeId: string): Promise<void> {
    await this.promotionRepository.deleteByStoreId(storeId);
  }
}
