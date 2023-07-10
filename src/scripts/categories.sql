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
SELECT  '976028d9-973c-4316-a896-fa32d501a1d0' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Sobremesas', ''
WHERE NOT EXISTS (
 SELECT name FROM category WHERE category.description  = 'Lanches'
);	


INSERT INTO category (id, store_id, "name", description)
SELECT  '976028d9-973c-4316-a896-fa32d501a1d0' , 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', 'Acompanhamentos', ''
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
VALUES(uuid_generate_v4(), 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Nuggets', '', '976028d9-973c-4316-a896-fa32d501a1d0');

INSERT INTO product
(id, store_id, creation_date, "name", description, "categoryId")
VALUES(uuid_generate_v4(), 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Batata Frita', '', '976028d9-973c-4316-a896-fa32d501a1d0');

INSERT INTO product
(id, store_id, creation_date, "name", description, "categoryId")
VALUES(uuid_generate_v4(), 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'Coca Cola', '', '2248112d-9777-4f6e-9d2c-c9c3b85371a2');

INSERT INTO product
(id, store_id, creation_date, "name", description, "categoryId")
VALUES(uuid_generate_v4(), 'b906ad23-afdf-4445-9aa0-25a9b49ff5fc', now(), 'X Tudo', '', '4a83c362-081a-4a10-8f98-36437d808c01');

