import { Promotion } from '../../domain/entities/promotion.entity';

export interface IGetPromotionByProductIdAndSellerId {
  getPromotionByProductIdAndSellerId(
    productId: string,
    sellerId: string,
  ): Promise<Promotion>;
}
