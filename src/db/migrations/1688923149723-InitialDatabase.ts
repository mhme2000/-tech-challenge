import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDatabase1688923149723 implements MigrationInterface {
  name = 'InitialDatabase1688923149723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "document" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."order_status_status_enum" NOT NULL DEFAULT '3', CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "order_id" character varying NOT NULL, "quantity" integer NOT NULL, "total_price" numeric(3,2) NOT NULL, "discount" numeric(3,2) NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "prevision_delivery_date" TIMESTAMP NOT NULL DEFAULT now(), "total_price" numeric(3,2) NOT NULL, "statusId" uuid, CONSTRAINT "REL_3b6667bfe775fa39753ca6af2d" UNIQUE ("statusId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pricing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "product_id" character varying NOT NULL, "total_price" numeric(3,2) NOT NULL, CONSTRAINT "PK_59d5c0be55c41bc93a406ca017f" PRIMARY KEY ("id", "store_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "description" character varying NOT NULL, "product_id" character varying NOT NULL, CONSTRAINT "PK_9bf3a72dd407c1d6211d9c1f0a7" PRIMARY KEY ("id", "store_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_promotion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "promotion_id" character varying NOT NULL, CONSTRAINT "PK_ff75f2533098c00aeb93a6f2349" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "promotion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "discountType" "public"."promotion_discounttype_enum" NOT NULL DEFAULT '1', "discount_value" numeric NOT NULL, "total_price" numeric(3,2) NOT NULL, CONSTRAINT "PK_0a1f332b36453f58d395983544c" PRIMARY KEY ("id", "store_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "category_id" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "product_id" character varying NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_b4f58c8a19864695ee0991e4dcb" PRIMARY KEY ("id", "store_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc" FOREIGN KEY ("statusId") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc"`,
    );
    await queryRunner.query(`DROP TABLE "stock"`);
    await queryRunner.query(`DROP TABLE "store"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "promotion"`);
    await queryRunner.query(`DROP TABLE "product_promotion"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "pricing"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "order_item"`);
    await queryRunner.query(`DROP TABLE "order_status"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
