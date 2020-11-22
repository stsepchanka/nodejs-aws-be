--create table products (
--	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--	title text NOT NULL,
--	description text,
--	price integer
--)
--
--create table stocks (
--	product_id uuid,
--	count int,
--	foreign key ("product_id") references "products" ("id")
--)
--
--insert into products (title, description, price) values
--	('Amazon Web Services Bootcamp', 'The main focus of this book is teaching you how to build and manage highly reliable and scalable applications and services on AWS', 2.4),
--	('Amazon Web Services in Action', 'Amazon Web Services in Action, Second Edition is a comprehensive introduction to computing, storing, and networking in the AWS cloud', 10),
--	('AWS: Amazon Web Services', 'Learning how to use AWS and understanding its pros and cons', 23),
--	('AWS Automation Cookbook', 'By the end of this AWS book, you?ll have complete control over your software development life cycle and be able to minimize application downtime by implementing CI/CD', 15),
--	('Effective DevOps with AWS', 'This book explains how to treat infrastructure as code', 23),
--	('Learning Amazon Web Services (AWS)', 'Learning AWS is the perfect foundational resource for all administrators, developers, project managers', 15),
--	('Mastering AWS Cost Optimization', 'This book is intended to support you in overcoming the challenge of cost control and optimization', 23),
--	('Mastering AWS Security', 'This book is for all IT professionals', 15)
--
--insert into stocks (product_id, count) values
--	('ef23d629-00d3-408d-837b-1c1b24b981d2', 14),
--	('a52a473c-113b-4eb0-85f3-f1d805ac4076', 16),
--	('398b8bee-8f30-4da6-860e-b11212585b53', 17),
--	('55034db8-b763-4c63-a837-cdb46b6d3a7e', 18),
--	('58c965fe-dce9-4377-b013-f3d8ec6c1b70', 17),
--	('74759924-999a-4fbc-a373-d7cb4b6d3830', 18),
--	('b2ebea55-3607-4ac6-9137-c510801ba083', 16),
--	('e6d1c185-e43b-4230-9e5d-d75f8bd70963', 13)
	

--ALTER TABLE products ALTER COLUMN price type FLOAT(2)

delete from products where title like 'AWS Book%'

delete from stocks where count < 13

--select p.*, s.count from products p left join stocks s on p.id = s.product_id

--select p.*, s.count from products p left join stocks s on p.id = s.product_id where p.id = '4a0e8ace-c989-48a2-8301-5e04ca92ea2d'

--INSERT INTO products (title, description, price) VALUES('AWS Book', 'Book description', 2) RETURNING id

--create extension if not exists "uuid-ossp"