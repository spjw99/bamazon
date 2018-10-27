DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
    item_id int(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_id int(11) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock_quantity INT(11) NOT NULL DEFAULT 0,
    primary key(item_id)
);

DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
    department_id int(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    product_sales DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    PRIMARY KEY(department_id)
);

