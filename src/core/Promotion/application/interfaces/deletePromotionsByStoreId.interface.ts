export interface IDeletePromotionsByStoreId {
  delete(storeId: string): Promise<void>;
}
