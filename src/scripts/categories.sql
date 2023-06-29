INSERT INTO category (id, description)
 SELECT  gen_random_uuid () , 'Lanche' 
WHERE 
NOT  EXISTS (
 SELECT description FROM category WHERE category.description  = 'Lanche'
);	
INSERT INTO category (id, description)
 SELECT  gen_random_uuid () , 'Sobremesa' 
WHERE 
NOT  EXISTS (
 SELECT description FROM category WHERE category.description  = 'Sobremesa'
);	
INSERT INTO category (id, description)
 SELECT  gen_random_uuid () , 'Acompanhamento' 
WHERE 
NOT  EXISTS (
 SELECT description FROM category WHERE category.description  = 'Acompanhamento'
);	