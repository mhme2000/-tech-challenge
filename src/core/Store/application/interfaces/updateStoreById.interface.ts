import { AddOrUpdateStoreDto } from '../../domain/dtos/addOrUpdateStoreDto';
import { Store } from '../../domain/entities/store.entity';

export interface IUpdateStoreByIdApplication {
  updateStoreById(store: AddOrUpdateStoreDto): Promise<Store>;
}
