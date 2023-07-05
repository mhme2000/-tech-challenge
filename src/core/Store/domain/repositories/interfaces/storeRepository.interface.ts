import { Store } from '../../entities/store.entity';

export interface IStoreRepository {
  getById(storeId: string): Promise<Store>;
  get(): Promise<Store[]>;
  hardDelete(store: Store): Promise<void>;
  addOrUpdate(store: Store): Promise<Store>;
}
