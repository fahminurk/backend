-- day8

create database db_todo;
use  db_todo;

create table todos(
id int primary key auto_increment,
judul varchar(225),
date datetime,
description varchar(225)
);

insert into todos(judul, date, description) 
values('makan pizza', curdate(), 'makan pizza hut bareng doi '),
('lari', curdate(),'lari dari kenyataan');

select * from todos;

