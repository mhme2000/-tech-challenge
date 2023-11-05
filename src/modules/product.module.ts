import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../adapter/driven/infra/repositories/product.repository';
import { ProductController } from '../adapter/driver/api/controllers/product.controller';
import { CreateProductApplication } from '../core/Product/application/createProduct.application';
import { DeleteProductByIdApplication } from '../core/Product/application/deleteProductById.application';
import { GetAllProductsApplication } from '../core/Product/application/getAllProducts.application';
import { GetProductByCategoryIdApplication } from '../core/Product/application/getProductByCategoryId.application';
import { GetProductByIdApplication } from '../core/Product/application/getProductById.application';
import { PRODUCT_TYPES } from '../core/Product/application/types';
import { UpdateProductByIdApplication } from '../core/Product/application/updateProductById.application';
import { Product } from '../core/Product/domain/entities/product.entity';
// Product
const getProductByIdApp = {
  provide: PRODUCT_TYPES.applications.IGetProductByIdApplication,
  useClass: GetProductByIdApplication,
};
const getProductByCategoryIdApp = {
  provide: PRODUCT_TYPES.applications.IGetProductByCategoryIdApplication,
  useClass: GetProductByCategoryIdApplication,
};
const getAllProductsApp = {
  provide: PRODUCT_TYPES.applications.IGetAllProductsApplication,
  useClass: GetAllProductsApplication,
};
const deleteProductByIdApp = {
  provide: PRODUCT_TYPES.applications.IDeleteProductByIdApplication,
  useClass: DeleteProductByIdApplication,
};
const updateProductByIdApp = {
  provide: PRODUCT_TYPES.applications.IUpdateProductByIdApplication,
  useClass: UpdateProductByIdApplication,
};
const createProductApp = {
  provide: PRODUCT_TYPES.applications.ICreateProductApplication,
  useClass: CreateProductApplication,
};
const productRepository = {
  provide: PRODUCT_TYPES.repositories.IProductRepository,
  useClass: ProductRepository,
};

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    getProductByIdApp,
    getProductByCategoryIdApp,
    getAllProductsApp,
    deleteProductByIdApp,
    updateProductByIdApp,
    createProductApp,
    productRepository,
  ],
})
export class ProductModule {}
