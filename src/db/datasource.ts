import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// eslint-disable-next-line
require('dotenv').config();

export const dataSourceOptions: TypeOrmModuleOptions &
  PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    'dist/core/**/*.entity.js',
    'dist/adapter/driver/schemas/*.schema.js',
  ],
  cache: false,
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/db/migrations/*.js'],
};

export const datasource = new DataSource(dataSourceOptions);
