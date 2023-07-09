import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPromotion } from '../../../../core/Promotion/domain/entities/productPromotion.entity';
import { Promotion } from '../../../../core/Promotion/domain/entities/promotion.entity';
import { IPromotionRepository } from '../../../../core/Promotion/domain/repositories/interfaces/promotionRepository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionRepository implements IPromotionRepository {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}
  async deleteByStoreId(storeId: string): Promise<void> {
    await this.promotionRepository.delete({ storeId });
  }
  async getPromotionByProductIdAndStoreId(
    productId: string,
    storeId: string,
  ): Promise<Promotion> {
    const currentDate = new Date().getTime();
    return await this.promotionRepository
      .createQueryBuilder('p')
      .innerJoin(ProductPromotion, 'pp', 'p.id = pp."ppomotionId"')
      .where('pp."productId" = :productId', { productId })
      .andWhere('p."storeId" = :storeId', { storeId })
      .andWhere('p."startDate" >= :currentDate', { currentDate })
      .andWhere('p."endDate" < :currentDate', { currentDate })
      .getOne();
  }
}
