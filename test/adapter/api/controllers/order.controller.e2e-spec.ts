import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Order } from '../../../../src/core/Order/domain/entities/order.entity';
import { OrderModule } from '../../../../src/modules';
import { OrderStatus } from '../../../../src/core/Order/domain/entities/orderStatus.entity';
import { OrderItem } from '../../../../src/core/Order/domain/entities/orderItem.entity';

describe('Order', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [OrderStatus, OrderItem, Order],
          logging: false,
          synchronize: true,
        }),
        HttpModule,
        OrderModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/GET/:id get a order by id without being in database`, () => {
    return request(app.getHttpServer())
      .get('/product/2398a26a-6dc3-4e54-aafe-57b146a02620')
      .expect(HttpStatus.NOT_FOUND);
  });
});
