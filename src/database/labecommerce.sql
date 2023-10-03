-- Active: 1695763327089@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
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


CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;
--Seleciona toda a tabela

PRAGMA table_info(products);
--Informações da tabela

DROP TABLE products;
--Deleta a tabela inteira

DELETE FROM products WHERE id='';
--Deleta as informações da tabela

 UPDATE products SET image_url='https://plus.unsplash.com/premium_photo-1682125724182-1eadf9d1360d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1928&q=80' WHERE id='p002';
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
VALUES('p006', 'Fone de ouvido JBL',400.00,'Fone Bluetooth ','hhttps://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg');

DELETE FROM products WHERE id='p008';

UPDATE products
SET 
    id='p008',
    name='Xbox',
    price= 4999.99,
    description='Series x',
    image_url='hhttps://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg'
WHERE id='p001';












