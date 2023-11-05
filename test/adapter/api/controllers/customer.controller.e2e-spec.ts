import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CustomerModule } from '../../../../src/modules/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CustomerSchema } from '../../../../src/adapter/driver/schemas/customer.schema';

describe('Customer', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [CustomerSchema],
          logging: false,
          synchronize: true,
        }),
        HttpModule,
        CustomerModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  const customerMockTest = {
    name: 'Teste',
    email: 'teste@fiap.com',
    document: '58854024007',
  };

  let customerSavedId;

  it(`/POST create a customer`, async () => {
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send(customerMockTest)
      .expect(HttpStatus.CREATED);
    customerSavedId = response.body.data.id;
  });

  it(`/POST create a customer error when document that is not a valid CPF`, () => {
    return request(app.getHttpServer())
      .post('/customer')
      .send({ ...customerMockTest, document: '12345678901' })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        message: ['(12345678901) is not a valid CPF document'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it(`/GET get customer by a document`, async () => {
    const response = await request(app.getHttpServer())
      .get(`/customer/document/${customerMockTest.document}`)
      .expect(HttpStatus.CREATED);
    expect(response.body.statusCode).toBe(HttpStatus.CREATED);
    delete response.body.data.creationDate;
    expect(response.body.data).toEqual({
      id: customerSavedId,
      ...customerMockTest,
    });
  });

  it(`/GET get customer by a document that not exists in database`, () => {
    return request(app.getHttpServer())
      .get('/customer/document/12345278901')
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      });
  });
});
