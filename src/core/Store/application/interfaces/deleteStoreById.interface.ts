export interface IDeleteStoreByIdApplication {
  deleteStoreById(storeId: string): Promise<void>;
}
