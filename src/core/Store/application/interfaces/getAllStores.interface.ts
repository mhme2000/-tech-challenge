import { Store } from '../../domain/entities/store.entity';

export interface IGetAllStoresApplication {
  getAllStores(): Promise<Store[]>;
}
