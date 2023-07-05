import { Inject, Injectable } from '@nestjs/common';
import { IGetPromotionByProductIdAndSellerId } from './interfaces/getPromotionByProductIdAndSellerId.interface';
import { Promotion } from '../domain/entities/promotion.entity';
import { ORDER_TYPES } from '../types';
import { IPromotionRepository } from '../domain/repositories/interfaces/promotionRepository.interface';

@Injectable()
export class GetPromotionByProductIdAndSellerId
  implements IGetPromotionByProductIdAndSellerId
{
  constructor(
    @Inject(ORDER_TYPES.repositories.IPromotionRepository)
    private promotionRepository: IPromotionRepository,
  ) {}

  async getPromotionByProductIdAndSellerId(
    productId: string,
    sellerId: string,
  ): Promise<Promotion> {
    return await this.promotionRepository.getPromotionByProductIdAndSellerId(
      productId,
      sellerId,
    );
  }
}
