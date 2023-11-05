import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ProductModule } from '../../../../src/modules/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Product } from '../../../../src/core/Product/domain/entities/product.entity';
import { Category } from '../../../../src/core/Product/domain/entities/category.entity';

describe('Product', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Category, Product],
          logging: false,
          synchronize: true,
        }),
        HttpModule,
        ProductModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/GET/:id get a product by id without being in database`, () => {
    return request(app.getHttpServer())
      .get('/product/2398a26a-6dc3-4e54-aafe-57b146a02620')
      .expect(HttpStatus.NOT_FOUND);
  });

  it(`/GET get all product`, () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(HttpStatus.OK)
      .expect({
        statusCode: HttpStatus.OK,
        data: [],
      });
  });
});
