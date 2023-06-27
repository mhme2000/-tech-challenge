import { Module } from '@nestjs/common';
import { PSQLORMConfig } from './config/psql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './modules';

@Module({
  imports: [TypeOrmModule.forRoot(PSQLORMConfig), OrderModule],
})
export class AppModule {}
