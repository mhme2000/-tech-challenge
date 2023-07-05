import { Promotion } from '../../entities/promotion.entity';

export interface IPromotionRepository {
  getPromotionByProductIdAndSellerId(
    productId: string,
    sellerId: string,
  ): Promise<Promotion>;
}
