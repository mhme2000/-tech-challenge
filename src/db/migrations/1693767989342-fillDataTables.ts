import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillDataTables1693767989342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO store (id, creation_date, "name", description)
                SELECT 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'FIAP Sorvetes', ''
                WHERE NOT EXISTS (
                    SELECT name FROM store WHERE store.name  = 'FIAP Sorvetes'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO category (id, store_id, "name", description)
                SELECT  '976028d9-973c-4316-a896-fa32d501a1d0' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Lanches', ''
                WHERE NOT EXISTS (
                 SELECT id FROM category WHERE category.id  = '976028d9-973c-4316-a896-fa32d501a1d0'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO category (id, store_id, "name", description)
                SELECT  'f776c8e0-4178-45ff-8dd2-51ba20d9d35e' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Sobremesas', ''
                WHERE NOT EXISTS (
                 SELECT id FROM category WHERE category.id  = 'f776c8e0-4178-45ff-8dd2-51ba20d9d35e'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO category (id, store_id, "name", description)
                SELECT  '9bd02565-0843-4b91-96bb-06b6bc67c0a7' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Acompanhamentos', ''
                WHERE NOT EXISTS (
                 SELECT id FROM category WHERE category.id  = '9bd02565-0843-4b91-96bb-06b6bc67c0a7'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO category (id, store_id, "name", description)
                SELECT  '2248112d-9777-4f6e-9d2c-c9c3b85371a2' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Bebidas', ''
                WHERE NOT EXISTS (
                 SELECT id FROM category WHERE category.id  = '2248112d-9777-4f6e-9d2c-c9c3b85371a2'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO category (id, store_id, "name", description)
                SELECT  '4a83c362-081a-4a10-8f98-36437d808c01' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Lanches', ''
                WHERE NOT EXISTS (
                 SELECT id FROM category WHERE category.id  = '4a83c362-081a-4a10-8f98-36437d808c01'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO product
                (id, store_id, creation_date, "name", description, "categoryId", "price", "image")
                SELECT 'a6f90640-7a77-4197-8f95-2250d74085f6', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Nuggets', '', '976028d9-973c-4316-a896-fa32d501a1d0', '28', 'https://en.wikipedia.org/wiki/Chicken_nugget#/media/File:Chicken_Nuggets.jpg'
                WHERE NOT EXISTS (
                 SELECT id FROM product WHERE product.id  = 'a6f90640-7a77-4197-8f95-2250d74085f6'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO product
                (id, store_id, creation_date, "name", description, "categoryId", "price", "image")
                SELECT  '2c4e12cf-73cf-4877-a625-1d7392eb86de', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Batata Frita', '', '976028d9-973c-4316-a896-fa32d501a1d0', '10', 'https://i.panelinha.com.br/i1/64-bk-7993-batata-frita-tradicional.webp'
                WHERE NOT EXISTS (
                 SELECT id FROM product WHERE product.id  =  '2c4e12cf-73cf-4877-a625-1d7392eb86de'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO product
                (id, store_id, creation_date, "name", description, "categoryId", "price", "image")
                SELECT  'f1e0f190-9e46-435a-9cdc-8c7236272b12', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Coca Cola', '', '2248112d-9777-4f6e-9d2c-c9c3b85371a2', '100', 'https://www.imigrantesbebidas.com.br/img/bebida/images/products/full/99728-refrigerante-coca-cola-1-5l.20230509085226.jpg?s=9d0bdd3a639db59e5ace0a67086c4368'
                WHERE NOT EXISTS (
                 SELECT id FROM product WHERE product.id  = 'f1e0f190-9e46-435a-9cdc-8c7236272b12'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO product
                (id, store_id, creation_date, "name", description, "categoryId", "price", "image")
                SELECT  'f61690ea-ab1d-4160-8d0c-7cddd52e4cb7', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'X Tudo', '', '4a83c362-081a-4a10-8f98-36437d808c01', '20', 'https://conteudo.imguol.com.br/c/entretenimento/17/2023/05/24/x-tudo-brasileiro-tem-variedade-de-ingredientes-de-acordo-com-preferencias-regionais-aqui-versao-com-carne-bovina-tomato-salsicha-presunto-bacon-e-queijo-no-pao-1684938396547_v2_900x506.jpg.webp'
                WHERE NOT EXISTS (
                 SELECT id FROM product WHERE product.id  =  'f61690ea-ab1d-4160-8d0c-7cddd52e4cb7'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO customer
                (id, email, "document", creation_date, "name")
                SELECT  '646deba3-bb2c-4ccb-8c8b-7ad6c53b9bdb', 'customer@teste.com', '123456789', now(), 'customer'
                WHERE NOT EXISTS (
                 SELECT id FROM customer WHERE customer.id  = '646deba3-bb2c-4ccb-8c8b-7ad6c53b9bdb'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO order_status
                (id, status)
                SELECT 'd7e5c30d-ce8f-4169-89b8-37eb2b763913', 'RECEIVED'
                WHERE NOT EXISTS (
                 SELECT id FROM order_status WHERE order_status.id  = 'd7e5c30d-ce8f-4169-89b8-37eb2b763913'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO order_status
                (id, status)
                SELECT '5ca2cc5a-31de-4ec9-a27f-10b7144b6ee7', 'DELIVERED'
                WHERE NOT EXISTS (
                 SELECT id FROM order_status WHERE order_status.id  = '5ca2cc5a-31de-4ec9-a27f-10b7144b6ee7'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO order_status
                (id, status)
                SELECT '1e6d552f-cc12-4c8f-87a9-1666ac38c7a7', 'IN_PREPARATION'
                WHERE NOT EXISTS (
                 SELECT id FROM order_status WHERE order_status.id  = '1e6d552f-cc12-4c8f-87a9-1666ac38c7a7'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO order_status
                (id, status)
                SELECT 'e7559cd9-f1b3-438b-aef6-ed8085fc5b25', 'PENDING_PAYMENT'
                WHERE NOT EXISTS (
                 SELECT id FROM order_status WHERE order_status.id  = 'e7559cd9-f1b3-438b-aef6-ed8085fc5b25'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO order_status
                (id, status)
                SELECT '2e69d181-14b6-437b-b819-d56dbfd926d2', 'CANCELED'
                WHERE NOT EXISTS (
                 SELECT id FROM order_status WHERE order_status.id  = '2e69d181-14b6-437b-b819-d56dbfd926d2'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO "order"
                (id, store_id, customer_id, creation_date, prevision_delivery_date, total_price, "status_id", "external_payment_id")
                SELECT 'e1912966-3f70-4a0a-9822-25e0c422d2f2', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', '646deba3-bb2c-4ccb-8c8b-7ad6c53b9bdb', now(), now(), 20, 'd7e5c30d-ce8f-4169-89b8-37eb2b763913', '5bcda82b-6226-4358-a845-403675319104'
                WHERE NOT EXISTS (
                 SELECT id FROM "order" WHERE "order".id  = 'e1912966-3f70-4a0a-9822-25e0c422d2f2'
                );`,
    );

    await queryRunner.query(
      `INSERT INTO "order"
                (id, store_id, customer_id, creation_date, prevision_delivery_date, total_price, "status_id", "external_payment_id")
                SELECT '031dd13a-0046-4bed-b643-b2798a511022', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', '646deba3-bb2c-4ccb-8c8b-7ad6c53b9bdb', now(), now(), 100, 'd7e5c30d-ce8f-4169-89b8-37eb2b763913', '71e92fef-5088-48ad-9071-8a5edc18fff7'
                WHERE NOT EXISTS (
                 SELECT id FROM "order" WHERE "order".id  = '031dd13a-0046-4bed-b643-b2798a511022'
                );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "stock" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "store" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "product_promotion" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "pricing" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "promotion" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "product" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "order" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "order_item" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "customer" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "user" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "order_status" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "category" CASCADE`);
  }
}
