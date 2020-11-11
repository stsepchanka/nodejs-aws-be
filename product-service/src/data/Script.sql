--create table products (
--	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--	title text NOT NULL,
--	description text,
--	price integer
--)

--create table stocks (
--	product_id uuid,
--	count int,
--	foreign key ("product_id") references "products" ("id")
--)

--insert into products (title, description, price) values
--	('Amazon Web Services Bootcamp', 'The main focus of this book is teaching you how to build and manage highly reliable and scalable applications and services on AWS', 2.4),
--	('Amazon Web Services in Action', 'Amazon Web Services in Action, Second Edition is a comprehensive introduction to computing, storing, and networking in the AWS cloud', 10),
--	('AWS: Amazon Web Services', 'Learning how to use AWS and understanding its pros and cons', 23),
--	('AWS Automation Cookbook', 'By the end of this AWS book, you?ll have complete control over your software development life cycle and be able to minimize application downtime by implementing CI/CD', 15),
--	('Effective DevOps with AWS', 'This book explains how to treat infrastructure as code', 23),
--	('Learning Amazon Web Services (AWS)', 'Learning AWS is the perfect foundational resource for all administrators, developers, project managers', 15),
--	('Mastering AWS Cost Optimization', 'This book is intended to support you in overcoming the challenge of cost control and optimization', 23),
--	('Mastering AWS Security', 'This book is for all IT professionals', 15)

--insert into stocks (product_id, count) values
--	('4a0e8ace-c989-48a2-8301-5e04ca92ea2d', 4),
--	('7aadfcbb-3da5-40d9-9a28-ee01bac91960', 6),
--	('35ca3072-31db-4795-ae10-8d97d40a8be4', 7),
--	('056ad485-4cf0-4aa2-bbef-363ba909feb6', 12),
--	('adf8050f-e451-4462-bfb3-e4475bef95fb', 7),
--	('e3590f88-77d7-4420-8d2d-b9f56d0d99fc', 8),
--	('1790d5a8-9437-4bf8-aa0d-8e4b103ab7e8', 2),
--	('8db66bb8-b162-42f5-b5d2-d06be0aae875', 3)
	

--ALTER TABLE products ALTER COLUMN price type FLOAT(2)

--delete from products where id = 'c3088aea-4a97-4913-af1f-200d4a79ddf5'
--
--delete from stocks where product_id = 'c3088aea-4a97-4913-af1f-200d4a79ddf5'

--select p.*, s.count from products p left join stocks s on p.id = s.product_id

--select p.*, s.count from products p left join stocks s on p.id = s.product_id where p.id = '4a0e8ace-c989-48a2-8301-5e04ca92ea2d'

--INSERT INTO products (title, description, price) VALUES('AWS Book', 'Book description', 2) RETURNING id

--create extension if not exists "uuid-ossp"