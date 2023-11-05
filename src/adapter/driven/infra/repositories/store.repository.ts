import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../../../../core/Store/domain/entities/store.entity';
import { IStoreRepository } from '../../../../core/Store/domain/repositories/interfaces/storeRepository.interface';
import { Repository } from 'typeorm';
import { StoreSchema } from '../../../driver/schemas/store.schema';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(StoreSchema) private repository: Repository<Store>,
  ) {}
  async getById(storeId: string): Promise<Store> {
    return await this.repository.findOne({
      where: {
        id: storeId,
      },
    });
  }
  async get(): Promise<Store[]> {
    return await this.repository.find({});
  }
  async hardDelete(store: Store): Promise<void> {
    await this.repository.remove(store);
  }
  async addOrUpdate(store: Store): Promise<Store> {
    return await this.repository.save(store);
  }
}
