import { Inject, Injectable } from '@nestjs/common';
import { Promotion } from '../domain/entities/promotion.entity';
import { ORDER_TYPES } from '../types';
import { IPromotionRepository } from '../domain/repositories/interfaces/promotionRepository.interface';
import { IGetPromotionByProductIdAndStoreId } from './interfaces/getPromotionByProductIdAndStoreId.interface';

@Injectable()
export class GetPromotionByProductIdAndStoreId
  implements IGetPromotionByProductIdAndStoreId
{
  constructor(
    @Inject(ORDER_TYPES.repositories.IPromotionRepository)
    private promotionRepository: IPromotionRepository,
  ) {}

  async getPromotionByProductIdAndStoreId(
    productId: string,
    storeId: string,
  ): Promise<Promotion> {
    return await this.promotionRepository.getPromotionByProductIdAndStoreId(
      productId,
      storeId,
    );
  }
}
