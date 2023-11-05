import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { StoreModule } from '../../../../src/modules/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { StoreSchema } from '../../../../src/adapter/driver/schemas/store.schema';

describe('Store', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [StoreSchema],
          logging: false,
          synchronize: true,
        }),
        HttpModule,
        StoreModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET/:id get store by id without store in database`, () => {
    return request(app.getHttpServer())
      .get('/store/2398a26a-6dc3-4e54-aafe-57b146a02620')
      .expect(HttpStatus.NOT_FOUND);
  });

  it(`/GET get all store`, () => {
    return request(app.getHttpServer())
      .get('/store')
      .expect(HttpStatus.OK)
      .expect({
        statusCode: HttpStatus.OK,
        data: [],
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
