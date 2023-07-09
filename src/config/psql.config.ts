import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const PSQLORMConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'teste',
  password: 'teste',
  database: 'tech-challenge',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
