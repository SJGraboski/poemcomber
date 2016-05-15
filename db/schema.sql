create database poem_comb;
use poem_comb;

create table users
	(
		id int auto_increment not null unique,
		username varchar(255) not null unique,
		password varchar(255) not null unique
		role varchar(10) not null,
		primary key(id)
	);

create table assignments
	(
		id int auto_increment not null,
		textfileroute varchar(255) not null,
		title varchar(255) not null,
		summary varchar(2000),
		date timestamp not null,
		primary key (id)
	);

create table comments
	(
		id int auto_increment not null,
		foreignAssignment int not null,
		foreignUser int not null,
		comment varchar(4000) not null,
		startingLine int not null,
		endingLine int not null,
		date timestamp not null,
		primary key (id)
	);