import { Module } from '@nestjs/common';
import { PSQLORMConfig } from './config/psql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules';
import { ProductModule } from './modules/product.module';
import { StoreModule } from './modules/store.module';
import { CustomerModule } from './modules/customer.module';

@Module({
  imports: [TypeOrmModule.forRoot(PSQLORMConfig), OrderModule, ProductModule, StoreModule, CustomerModule],
})
export class AppModule { }
