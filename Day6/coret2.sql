
set sql_safe_updates = 0;
use db_purwadhika;

create table branches(
id int primary key auto_increment,
branch varchar(225),
address varchar(225)
);

create table lecturers(
id int primary key auto_increment,
name varchar(225),
address varchar(225));

create table programs (
id int primary key auto_increment,
program varchar(225),
lecturerId int,
branchId int,
constraint FK_branches foreign key (branchId) references branches(id),
constraint FK_lecturers foreign key (lecturerId) references lecturers(id)
);

select * from programs;
delete from students;
alter table students auto_increment = 1;
select * from students;
insert into students (firstName, lastName, age, email, gender)
values('fahmi', 'nur', 26, 'fahmi@gmail.com', 'Male'),
('chris', 'anjing', 46, 'chris@gmail.com', 'Male'),
('samsu', 'asu', 36, 'samsu@gmail.com', 'Male'),
('tyas', 'a', 21, 'tyas@gmail.com', 'Female'),
('asd', 'fgh', 0, 'asd@gmail.com', 'Male');
select * from students;
-- delete from students;
alter table students auto_increment = 1;

insert into branches (branch, address)
values('BATAM', 'NDP'),
('BSD','GOP 9'),
('JAKARTA','MSIG TOWER');
select * from branches;

insert into lecturers (name, address)
values('Jordan', 'Batam'),
('Malik','Batam'),
('Ragil','Batam'),
('Defryan','BSD');
select * from lecturers;

insert into programs(program, lecturerId,branchId)
values('JCWD', 1,1),
('JCDM',2,1),
('JCDS',3,1),
('JCWD',4,2);

create table nilai(
id int primary key auto_increment,
nilai int,
module varchar(225),
studentId int,
programId int,
constraint FK_Students foreign key (studentId) references Students(id),
constraint FK_Programs foreign key (programId) references Programs(id)
);
-- drop table nilai;
select * from nilai;
insert into nilai(nilai,module,studentId,programId)
values
(100,'Fundamental',1,4),
(90,'Fundamental',2,1),
(70,'Fundamental',3,1),
(70,'Fundamental',4,1),
(70,'Fundamental',5,4),
(70, 'Frontend',1,4),
(80, 'Frontend',2,1),
(75, 'Frontend',3,1),
(90, 'Frontend',4,1),
(100, 'Frontend',5,4);

select * from programs;
select * from students;
select * from nilai;
select * from lecturers;
select * from branches;
alter table nilai auto_increment = 1;

-- ada berapa student yg mengikuti program di batam
select count(students.id) from nilai
join programs on programs.id = nilai.programId
join students on students.id = nilai.studentId
join branches on branches.id = programs.branchId
where branches.branch ='BSD'
order by nilai desc limit 1;
-- berapa avg nilai student BSD
-- tampilkan student yg memiliki nilai tertinggi di batam dan bsd

