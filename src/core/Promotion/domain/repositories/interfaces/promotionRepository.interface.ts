import { Promotion } from '../../entities/promotion.entity';

export interface IPromotionRepository {
  getPromotionByProductIdAndStoreId(
    productId: string,
    storeId: string,
  ): Promise<Promotion>;
  deleteByStoreId(storeId: string): Promise<void>;
}
