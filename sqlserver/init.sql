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
    username varchar(30) not null,
    password varchar(200) not null,
    role varchar(10) not null
);

insert into users (username, password, role) values ('admin', 'cisco', 'admin');

insert into users (name, surname, address, city, zipcode, state, birthdate, cell, phone, email, username, password, role)
values ('Andrea', 'Trentini', 'Via Craffonara, 2', 'Rovereto', '38068', 'Italy', '1968-04-08', '+39 1234567890', '+39 0464 411400', 'andrea.trentini@marconirovereto.it', 'andtrentini', 'pippo', 'user');