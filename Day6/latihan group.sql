create database library;
use library;


-- table members ////////////////////////////////////////////
create table members (
id int primary key auto_increment,
first_name varchar(225),
last_name varchar(225),
email varchar(225)
);
select * from members;
insert into members (first_name, last_name, email) values 
('Baarak', 'Ikhsan', 'baarak@mail.com'), 
('Fahmi', 'Fulan', 'fahmi@mail.com'),
('Hanif', 'Wasim', 'hanif@mail.com'),
('Ridho', 'Elmac', 'ridho@mail.com');


-- table books ///////////////////////////////////////////////
create table books (
id int primary key auto_increment,
name varchar(225),
author varchar(225),
publisher varchar(225)
);
select * from books;
insert into books (name, author, publisher) values 
('Muda Berdaya', 'Fahd P.', 'Gramedia'), 
('Harry Potter', 'J.K. Rowling', 'Gramedia'),
('Sapiens', 'Yuval Noah Harari', 'Gramedia'),
('The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'Pustaka Utama');


-- library branch /////////////////////////////////////////////
create table branches(
id int primary key auto_increment,
branch ENUM('Jakarta', 'Batam','Bandung')
);
select * from branches;
insert into branches (branch) values 
('Jakarta'), ('Batam'), ('Bandung');


-- table staff ///////////////////////////////////////
create table staff (
id int primary key auto_increment,
name varchar(225)
);
select * from staff;
insert into staff (name) values 
('Rey Bong'), ('Gara Sinatriya'), ('Samdipro'), ('Maulana'), ('Thomas');


-- table staff schedules ///////////////////////////////
create table staff_schedules (
id int primary key auto_increment,
staff_id int,
branch_id int,
schedule_date date,
constraint FK_staff foreign key (staff_id) references staff(id),
constraint FK_branches foreign key (branch_id) references branches(id)
);
select * from staff_schedules;
insert into staff_schedules(staff_id, branch_id, schedule_date)
values(1,1,'2023-05-01'),(1,1,'2023-05-02'),(1,1,'2023-05-03'),
(2,1,'2023-05-04'),(2,1,'2023-05-05'),(2,1,'2023-05-06'),

(4,2,'2023-05-01'),(4,2,'2023-05-02'),(4,2,'2023-05-03'),
(5,2,'2023-05-04'),(5,2,'2023-05-05'),(5,2,'2023-05-06'),

(3,3,'2023-05-01'),(3,3,'2023-05-02'),(3,3,'2023-05-03'),
(3,3,'2023-05-04'),(3,3,'2023-05-05'),(3,3,'2023-05-06')
;

-- table activities //////////////////////////////////////
create table activities(
id int primary key auto_increment,
member_id int,
book_id int,
staff_schedule_id int,
return_date date,
constraint FK_members foreign key (member_id) references members(id),
constraint FK_staff_schedules foreign key (staff_schedule_id) references staff_schedules(id),
constraint FK_books foreign key (book_id) references books(id)
);
select * from activities;
insert into activities(member_id,book_id,staff_schedule_id,return_date)
values (2,1,1,'2023-05-05'),(2,2,1,'2023-05-05'),(3,1,7,'2023-05-05'),(4,4,13,'2023-05-05');


-- table transaction ////////////////////////////////////
create table transaction(
id int primary key auto_increment,
activity_id int,
amount int,
fine int,
constraint FK_activities foreign key (activity_id) references activities(id)
);
select * from transaction;
insert into transaction (activity_id, amount, fine)
values (1, 10000, 5000), (2, 30000, 0), (3, 20000, 10000), (4, 30000, 15000);


-- //////////////////////////////////////////////////////////////////////////////////////////

select * from members;
select * from books;
select * from branches;
select * from staff;

select * from staff_schedules;
SELECT sc.id, s.name, b.branch, sc.schedule_date FROM staff_schedules sc
JOIN staff s ON s.id = sc.staff_id
JOIN branches b ON b.id = sc.branch_id;


select * from activities;
SELECT a.id, CONCAT(m.first_name, ' ', m.last_name) Nama_Peminjam, bk.name as Nama_Buku, s.name as Nama_Staff,
sc.schedule_date as borrow_date, a.return_date, b.branch FROM activities a
JOIN members m ON m.id = a.member_id
JOIN books bk ON bk.id = a.book_id
JOIN staff_schedules sc ON sc.id = a.staff_schedule_id
JOIN staff s ON s.id = sc.staff_id
JOIN branches b ON b.id = sc.branch_id;


select * from transaction;
SELECT t.id, CONCAT(m.first_name, ' ', m.last_name) Nama_Peminjam, a.id as activity_id, t.amount as Biaya_Peminjaman, t.fine as Biaya_Denda, 
(t.amount + t.fine) Total_Biaya, s.name as Nama_Staff, sc.schedule_date as transaction_date, b.branch FROM transaction t
LEFT JOIN activities a ON a.id = t.activity_id
JOIN members m ON m.id = a.member_id
JOIN staff_schedules sc ON sc.id = a.staff_schedule_id
JOIN staff s ON s.id = sc.staff_id
JOIN branches b ON b.id = sc.branch_id;







