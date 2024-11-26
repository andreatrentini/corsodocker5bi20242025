drop database if exists corsows;

create database corsows;

use corsows;

create table users (
	id int primary key not null auto_increment,
    name varchar(30),
    surname varchar(30),
    address varchar(100),
    city varchar(50),
    zipcode char(5),
    state varchar(50),
    birthdate date,
    cell varchar(20),
    phone varchar(20),
    email varchar(50),
    username varchar(30) not null unique,
    password varchar(200) not null,
    role varchar(10) not null
);

create table logs (
    id int primary key not null auto_increment,
    operation_datetime TIMESTAMP,
    operation varchar(200),
    user varchar(30)
);

insert into logs (operation_datetime, operation, user) values (now(), 'Init database', 'System'); 