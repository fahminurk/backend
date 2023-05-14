-- students
-- program
-- branch
set sql_safe_updates = 0;


CREATE DATABASE DB_PURWADHIKA; -- membuat database
DROP DATABASE DB_PURWADHIKA; -- menghapus database
show databases; -- menampilkan seluruh database
use db_purwadhika; -- memakai/memilih sebuah database yg ada

create table students (  -- membuat table beserta key dan value nya
id int AUTO_INCREMENT,
firstName varchar(255),
lastName varchar(255),
age int,
email varchar(255),
gender ENUM('MALE','FEMALE')
);

ALTER TABLE students ADD PRIMARY KEY(id);  -- memilih key sebagai primary key

INSERT INTO students (firstName, lastName, age, email, gender)
VALUES('chris', 'anjing', 50, 'crisanjing@gmail.com', 'MALE'),
('topher', 'anjing', 50, 'crisanjing@gmail.com', 'MALE');

select * from students;
select firstname,lastname from students;
select concat(firstname,' ',lastname) full_name from students;

-- delete
delete from students;
delete from students where firstname = 'chris';

-- edit
update students set gender = 'female' where firstname = 'chris';

-- 
select distinct firstname from student; -- memunculkan data yg berbeda saja
select count(firstname) as 'jumlah student' from students; -- memunculkan jumlah student
select avg(age) as 'rata-rata umur student' from students; -- rata2 umur 

-- limit
select * from students limit 2;

-- order by
select * from students order by firstname desc;

-- group by
select count(id), gender from students group by gender;
select count(id) 'total id', 'hello' as pesan from students;

-- having
select count(id), gender from students where age >= 50 group by gender;

select count(id), gender, age,firstname from students group by gender,age,firstname;

-- ///////////////////////////////////////////////////////////////////////////////////

-- exersice 1 //////////////////////////////////////////////////////////
-- 1. create database
create database purwadhika_student;
create database purwadhika_schedule;
create database purwadhika_branch;

-- 2. show list database with name contain "purwadhika"
show databases like "%purwadhika%";
show databases;

-- 3. delete db purwadhika_schedule
DROP database purwadhika_schedule;

-- 4. create table students in purwadhika_student 
use purwadhika_student;

create table student(
id int,
lastName varchar(225),
firstName varchar(225),
address varchar(225),
city varchar(225)
);
alter table student add primary key(id);
select * from student;

-- 5. add email column into table student 
alter table student
add column email varchar(255);

-- 6. add gender, batch_code, number, alternative_phone_number column in single query 
alter table student
add column gender ENUM('male','female'),
add column batch_code varchar(225),
add column number int,
add column alternative_phone_number int;

-- 7 
alter table student change column alternative_phone_number description varchar(225);
-- 8. remove column gender
alter table student drop column gender;

-- exersice 2 ///////////////////////////////////////////////
-- 1. create table
use purwadhika_branch;
create table employee (
id int,
branch_name varchar(225),
pic varchar(225),
address varchar(225),
city varchar(225),
province varchar(225)
);
alter table employee add primary key(id);
insert into employee (branch_name, pic, address, city, province)
values("BSD", "THOMAS", "GREEN OFFICE PARK 9", "BSD", "TANGERANG"),
("JKT",'BUDI','MSIG TOWER','JAKSEL','JAKARTA'),
('BTM','ANGEL','NONGSA','BATAM','KEP. RIAU');
select * from employee;
-- delete from employee;
-- drop table employee;

-- 2. change PIC name into DONO if city is BSD
update employee set pic = 'DONO' where city = 'BSD';

-- 3. add another brench 
insert into employee (branch_name, pic, address, city, province)
 values('BLI','TONO','GIANYAR','GIANYAR','BALI');
 
 -- exersice 3 ////////////////////////////////////////////////////////////
 
 -- 1. display the first and last names off all actors from table actor
 use sakila;
 select first_name, last_name from actor;
 
 -- 2. 
 select actor_id, first_name, last_name from actor where first_name = 'joe';
 
 -- 3. 
 select address, district, city_id from address
 where district in ('california' , 'alberta', 'mekka');
 
 -- 4.
 select count(last_name) from actor where last_name = 'wood';
 
 -- 5.
 select * from payment;
 select customer_id, sum(amount) from payment
 group by customer_id having count(payment_id) > 20;
 
 -- exersice 4 ////////////////////////////////////////////////////
 
 -- 1. add new actor
 select * from actor;
 insert into actor (first_name, last_name)
 values ('JHONNY', 'DAVIS');
 
 -- 2.
 insert into actor (first_name, last_name)
 values ('ADAM', 'DAVIS'),('JEREMY', 'DAVIS'),('CRAIG','DAVIS'),('STEVE','DAVIS');
 
 -- 3. 
 select count(last_name) 'last name(DAVIS)' from ACTOR where last_name = 'davis';
 
 -- 4. 
 delete from actor where last_name = 'davis' and first_name = 'jennifer';
 
 -- 5
 update actor set first_name = 'GEORGE' where last_name = 'davis';
 
 -- 6
 select * from film_actor;
 select actor_id, count(film_id) from film_actor
 group by actor_id order by count(film_id) desc;
 
 
 -- //////////////////////////////////////////////
 
 select concat(first_name, '', last_name) as fullname, sum(amount) from payment p
 join customer c on c.customer.id = p.customer.id
 group by customer_id
 having sum(amount) > 20;
 
 use sakila;
 select * from customer;
 select c.customer_id, c.first_name, ad.address, ad.address_id from customer c
 right join address ad on ad.address_id = c.address_id; -- parent = customer, child = address
 -- semua data address akan muncul sebagai child dari customer
 
 select c.customer_id, c.first_name, ad.address, ad.address_id from address ad
 left join customer c on c.address_id = ad.address_id; -- parent = address, child = customer
 -- semua data address akan muncul sebagai parent
 
 select c.customer_id, c.first_name, ad.address, ad.address_id from address ad
 join customer c on c.address_id = ad.address_id;
 -- data yang muncul hanyalah data yang memiliki persamaan
 -- ///////////////////////////
 USE SAKILA;
 USE SAKILA;
 select * from rental;
 select * from staff;
 select * from customer;
 select * from payment;
 
 select(select first_name from staff where staff_id = a.staff_id) staff,
 (select first_name from customer where customer_id = a.customer_id ) customer,
 payment_date 
 from payment as a;
 
  -- select(select first_name from staff where staff_id = a.staff_id) staff,
--  (select first_name from customer where customer_id = a.customer_id ) customer,
--  (select payment_date from payment) payment_date,
--  * from rental as a;
 
 