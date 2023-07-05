import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/core/Store/domain/entities/store.entity';
import { IStoreRepository } from 'src/core/Store/domain/repositories/interfaces/storeRepository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(Store) private repository: Repository<Store>,
  ) { }
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
