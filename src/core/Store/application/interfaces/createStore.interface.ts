import { AddOrUpdateStoreDto } from '../../domain/dtos/addOrUpdateStoreDto';
import { Store } from '../../domain/entities/store.entity';

export interface ICreateStoreApplication {
  createStore(store: AddOrUpdateStoreDto): Promise<Store>;
}
