import { Store } from '../../domain/entities/store.entity';

export interface IGetStoreByIdApplication {
  getStoreById(storeId: string): Promise<Store>;
}
