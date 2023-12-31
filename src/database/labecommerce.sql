-- Active: 1695763327089@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);


CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);


CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
    ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
	ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
);


CREATE TABLE purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY(purchase_id) REFERENCES purchases(id)
        ON UPDATE CASCADE
		ON DELETE CASCADE,
        FOREIGN KEY(product_id) REFERENCES products(id)
        ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
		ON DELETE CASCADE -- efeito cascata ao atualizar id na tabela users
);

SELECT * FROM users;
--Seleciona toda a tabela

PRAGMA table_info(users);
--Informações da tabela

DROP TABLE users;
--Deleta a tabela inteira

DELETE FROM users WHERE id='';
--Deleta as informações da tabela

-- UPDATE users SET name='Brenda' WHERE id='u002';
--Atualiza informações
 
INSERT INTO users(id,name,email,password)
VALUES('u001', 'Yasmin', 'yas@gmail.com','010101');

INSERT INTO users(id,name,email,password)
VALUES('u002', 'Giovana', 'gio@gmail.com','020202'),
('u003', 'Heloisa', 'helo@gmail.com','030303'),
('u004', 'Isabela', 'isa@gmail.com','040404');


SELECT name FROM users;

INSERT INTO users(id,name,email,password)
VALUES('u005', 'Camilly', 'camil@gmail.com','050505');

DELETE FROM users WHERE id='u005';
------------------------------------------------------------------------------
--                 TABELA DE PRODUTOS



SELECT * FROM products;
--Seleciona toda a tabela

PRAGMA table_info(products);
--Informações da tabela

DROP TABLE products;
--Deleta a tabela inteira

DELETE FROM products WHERE id='';
--Deleta as informações da tabela

 UPDATE products SET image_url='https://picsum.photos/id/237/200/300' WHERE id='p005';
--Atualiza informações
 
INSERT INTO products(id,name,price,description,image_url)
VALUES('p001', 'Tv samsung',2999.00,'50 polegadas','https://unsplash.com/pt-br/fotografias/uXQdBfSTBow')

INSERT INTO products(id,name,price,description,image_url)
VALUES('p002', 'Iphone 13', 4299.00,'128bg','https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80'),
('p003', 'Geladeira', 1999.99,'Frost Free','https://images.pexels.com/photos/13077721/pexels-photo-13077721.jpeg?auto=compress&cs=tinysrgb&w=600'),
('p004', 'Fogão', 1850.00,'Seis bocas, Ferro fundido','https://images.unsplash.com/photo-1609211373254-b52e03ba0c85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80'),
('p005', 'Mesa', 5699.00,'Mesa para escritório, com seis lugares','https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2004&q=80');


SELECT * FROM products;

SELECT name FROM products;
SELECT name FROM products WHERE name LIKE 'geladeira%' ;

INSERT INTO products(id,name,price,description,image_url)
VALUES('p006', 'Fone de ouvido JBL',400.00,'Fone Bluetooth ','https://picsum.photos/id/237/200/300');

DELETE FROM products WHERE id='p006';

UPDATE products
SET 
    id='p004',
    name='Fogão',
    price= 1850.0,
    description='Fogão de seis bocas',
    image_url='https://picsum.photos/id/237/200/300'
WHERE id='p004';


--------------- TABELA PURCHASES ------------------
--criando a tabela



DROP TABLE purchases;

--populando a tabela
INSERT INTO purchases
VALUES ('pur001', 'u001', 79.50,DATETIME());


INSERT INTO purchases
VALUES ('pur002', 'u002', 99.00,DATETIME()),('pur003', 'u003', 49.99,DATETIME()),('pur004', 'u004', 136.99,DATETIME()),('pur005', 'u005', 19.50,DATETIME());

SELECT * FROM purchases;

--editando a tabela
UPDATE purchases
SET 
    total_price= 199.99
WHERE id='pur005';

UPDATE purchases
SET 
    total_price= total_price -10
WHERE id='pur001';


SELECT 
products.id AS id,
products.name AS name, 
products.price AS price, 
products.description AS description,
products.image_url AS imageUrl, 
purchases_products.quantity AS quantity
FROM products
INNER JOIN purchases_products ON purchases_products.product_id = products.id WHERE purchase_id='pur002';




--------------------------PURCHASES_PRODUCTS---------------------------------------



DROP TABLE purchases_products;
INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
    VALUES('pur002', 'p001', '3'),('pur004', 'p002','2'),('pur003', 'p003', '5');

    SELECT * FROM purchases_products;

SELECT * FROM
purchases_products 
INNER JOIN products ON 
    purchases_products.product_id = products.id
INNER JOIN purchases ON 
    purchases_products.purchase_id = purchases.id;
 
 

