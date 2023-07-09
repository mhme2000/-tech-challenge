import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules';
import { ProductModule } from './modules/product.module';
import { StoreModule } from './modules/store.module';
import { CustomerModule } from './modules/customer.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './adapter/driver/api/controllers/health.controller';
import { HttpModule } from '@nestjs/axios';
import { dataSourceOptions } from './db/datasource';

@Module({
  controllers: [HealthController],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TerminusModule,
    HttpModule,
    PrometheusModule.register(),
    OrderModule,
    ProductModule,
    StoreModule,
    CustomerModule,
  ],
})
export class AppModule {}
