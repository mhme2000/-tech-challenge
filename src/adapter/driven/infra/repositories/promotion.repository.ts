import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPromotion } from 'src/core/Promotion/domain/entities/productPromotion.entity';
import { Promotion } from 'src/core/Promotion/domain/entities/promotion.entity';
import { IPromotionRepository } from 'src/core/Promotion/domain/repositories/interfaces/promotionRepository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionRepository implements IPromotionRepository {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}
  async getPromotionByProductIdAndSellerId(
    productId: string,
    sellerId: string,
  ): Promise<Promotion> {
    const currentDate = new Date().getTime();
    return await this.promotionRepository
      .createQueryBuilder('p')
      .innerJoin(ProductPromotion, 'pp', 'p.id = pp."ppomotionId"')
      .where('pp."productId" = :productId', { productId })
      .andWhere('p."sellerId" = :sellerId', { sellerId })
      .andWhere('p."startDate" >= :currentDate', { currentDate })
      .andWhere('p."endDate" < :currentDate', { currentDate })
      .getOne();
  }
}
