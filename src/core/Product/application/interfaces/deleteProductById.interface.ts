export interface IDeleteProductByIdApplication {
  deleteProductById(productId: string): Promise<void>;
}
