import { Promotion } from '../../domain/entities/promotion.entity';

export interface IGetPromotionByProductIdAndStoreId {
  getPromotionByProductIdAndStoreId(
    productId: string,
    storeId: string,
  ): Promise<Promotion>;
}
