   
CREATE TABLE IF NOT EXISTS "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "document" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_d9445fbcb74d66c2fb7f2d2533e" PRIMARY KEY ("id", "email", "document"));
CREATE TABLE IF NOT EXISTS "order_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" text NOT NULL DEFAULT 'RECEIVED', CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "order_id" character varying NOT NULL, "quantity" integer NOT NULL, "total_price" numeric(3,2) NOT NULL, "discount" numeric(3,2) NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "customer_id" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "prevision_delivery_date" TIMESTAMP NOT NULL DEFAULT now(), "total_price" numeric(5,2) NOT NULL, "status_id" uuid, CONSTRAINT "PK_c0899e34ecfbf164afb35aec2e5" PRIMARY KEY ("id", "store_id", "customer_id"));
CREATE TABLE IF NOT EXISTS "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "categoryId" uuid, "categoryStoreId" character varying, CONSTRAINT "PK_0daef8d9bf14fa305f0c11c147c" PRIMARY KEY ("id", "store_id"));
CREATE TABLE IF NOT EXISTS "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9bf3a72dd407c1d6211d9c1f0a7" PRIMARY KEY ("id", "store_id"));
CREATE TABLE IF NOT EXISTS "promotion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "discountType" "public"."promotion_discounttype_enum" NOT NULL DEFAULT '1', "discount_value" numeric NOT NULL, "total_price" numeric(3,2) NOT NULL, CONSTRAINT "PK_0a1f332b36453f58d395983544c" PRIMARY KEY ("id", "store_id"));
CREATE TABLE IF NOT EXISTS "pricing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "product_id" character varying NOT NULL, "total_price" numeric(3,2) NOT NULL, CONSTRAINT "PK_59d5c0be55c41bc93a406ca017f" PRIMARY KEY ("id", "store_id"));
CREATE TABLE IF NOT EXISTS "product_promotion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "promotion_id" character varying NOT NULL, CONSTRAINT "PK_ff75f2533098c00aeb93a6f2349" PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "product_id" character varying NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_b4f58c8a19864695ee0991e4dcb" PRIMARY KEY ("id", "store_id"));
ALTER TABLE "order" ADD CONSTRAINT "FK_8ea75b2a26f83f3bc98b9c6aaf6" FOREIGN KEY ("status_id") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "product" ADD CONSTRAINT "FK_05476174688a864af19d43683b5" FOREIGN KEY ("categoryId", "categoryStoreId") REFERENCES "category"("id","store_id") ON DELETE NO ACTION ON UPDATE NO ACTION


INSERT INTO store (id, creation_date, "name", description)
SELECT 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'FIAP Sorvetes', ''
WHERE NOT EXISTS (
    SELECT name FROM store WHERE store.name  = 'FIAP Sorvetes'
);	

INSERT INTO category (id, store_id, "name", description)
SELECT  '976028d9-973c-4316-a896-fa32d501a1d0' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Lanches', ''
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Lanches'
);	


INSERT INTO category (id, store_id, "name", description)
SELECT  'f776c8e0-4178-45ff-8dd2-51ba20d9d35e' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Sobremesas', ''
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Lanches'
);	


INSERT INTO category (id, store_id, "name", description)
SELECT  '9bd02565-0843-4b91-96bb-06b6bc67c0a7' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Acompanhamentos', ''
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Lanches'
);	

INSERT INTO category (id, store_id, "name", description)
SELECT  '2248112d-9777-4f6e-9d2c-c9c3b85371a2' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Bebidas', ''
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Lanches'
);	


INSERT INTO category (id, store_id, "name", description)
SELECT  '4a83c362-081a-4a10-8f98-36437d808c01' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Lanches', ''
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Lanches'
);	


INSERT INTO product
(id, store_id, creation_date, "name", description, "categoryId")
SELECT  'a6f90640-7a77-4197-8f95-2250d74085f6', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Nuggets', '', '976028d9-973c-4316-a896-fa32d501a1d0'
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Nuggets'
);	


INSERT INTO product
(id, store_id, creation_date, "name", description, "categoryId")
SELECT  '2c4e12cf-73cf-4877-a625-1d7392eb86de', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Batata Frita', '', '976028d9-973c-4316-a896-fa32d501a1d0'
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Batata Frita'
);	

INSERT INTO product
(id, store_id, creation_date, "name", description, "categoryId")
SELECT  'f1e0f190-9e46-435a-9cdc-8c7236272b12', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Coca Cola', '', '2248112d-9777-4f6e-9d2c-c9c3b85371a2'
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Batata Frita'
);	

INSERT INTO product
(id, store_id, creation_date, "name", description, "categoryId")
SELECT  'f61690ea-ab1d-4160-8d0c-7cddd52e4cb7', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'X Tudo', '', '4a83c362-081a-4a10-8f98-36437d808c01'
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Batata Frita'
);	


INSERT INTO customer
(id, email, "document", creation_date, "name")
SELECT  '646deba3-bb2c-4ccb-8c8b-7ad6c53b9bdb', 'customer@teste.com', '123456789', now(), 'customer'
WHERE NOT EXISTS (
 SELECT name FROM customer WHERE customer.name  = 'customer'
);	


INSERT INTO order_status
(id, status)
SELECT 'd7e5c30d-ce8f-4169-89b8-37eb2b763913', 'RECEIVED'
WHERE NOT EXISTS (
 SELECT status FROM order_status WHERE order_status.status  = 'customer'
);	


INSERT INTO order_status
(id, status)
SELECT '2e69d181-14b6-437b-b819-d56dbfd926d2', 'CANCELED'
WHERE NOT EXISTS (
 SELECT status FROM order_status WHERE order_status.status  = 'customer'
);	


INSERT INTO "order"
(id, store_id, customer_id, creation_date, prevision_delivery_date, total_price, "status_id")
SELECT 'e1912966-3f70-4a0a-9822-25e0c422d2f2', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', '646deba3-bb2c-4ccb-8c8b-7ad6c53b9bdb', now(), now(), 20, 'd7e5c30d-ce8f-4169-89b8-37eb2b763913'
WHERE NOT EXISTS (
 SELECT id FROM "order" WHERE "order".id  = 'e1912966-3f70-4a0a-9822-25e0c422d2f2'
);

INSERT INTO "order"
(id, store_id, customer_id, creation_date, prevision_delivery_date, total_price, "status_id")
SELECT '031dd13a-0046-4bed-b643-b2798a511022', 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', '646deba3-bb2c-4ccb-8c8b-7ad6c53b9bdb', now(), now(), 100, 'd7e5c30d-ce8f-4169-89b8-37eb2b763913'
WHERE NOT EXISTS (
 SELECT id FROM "order" WHERE "order".id  = '031dd13a-0046-4bed-b643-b2798a511022'
);

