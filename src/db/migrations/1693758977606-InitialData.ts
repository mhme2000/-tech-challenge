import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialData1693767623666 implements MigrationInterface {
  name = 'InitialData1693767623666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "document" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "order_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" text NOT NULL DEFAULT 'RECEIVED', CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "order_id" character varying NOT NULL, "quantity" integer NOT NULL, "total_price" numeric(5,2) NOT NULL, "discount" numeric(5,2) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "pricing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "product_id" character varying NOT NULL, "total_price" numeric(5,2) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "categoryId" uuid, "categoryStoreId" character varying)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "customer_id" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "external_payment_id" character varying NOT NULL, "paymentStatus" text NOT NULL DEFAULT 'PENDING', "prevision_delivery_date" TIMESTAMP NOT NULL DEFAULT now(), "total_price" numeric(5,2) NOT NULL, "status_id" uuid)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "promotion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "discount_type" text NOT NULL DEFAULT '1', "discount_value" numeric NOT NULL, "total_price" numeric(5,2) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "product_promotion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "promotion_id" character varying NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "product_id" character varying NOT NULL, "quantity" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_8ea75b2a26f83f3bc98b9c6aaf6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_05476174688a864af19d43683b5"`,
    );
    await queryRunner.query(`DROP TABLE "store"`);
    await queryRunner.query(`DROP TABLE "stock"`);
    await queryRunner.query(`DROP TABLE "product_promotion"`);
    await queryRunner.query(`DROP TABLE "promotion"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "pricing"`);
    await queryRunner.query(`DROP TABLE "order_item"`);
    await queryRunner.query(`DROP TABLE "order_status"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
