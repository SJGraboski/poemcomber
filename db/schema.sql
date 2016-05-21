create database poem_comb;
use poem_comb;

create table users
	(
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
	  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
	  `role` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
	  `instructorName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
	  `createdAt` datetime NOT NULL,
	  `updatedAt` datetime NOT NULL,
	  PRIMARY KEY (`id`),
	  UNIQUE KEY `id` (`id`),
	  UNIQUE KEY `users_id_unique` (`id`),
	  UNIQUE KEY `username` (`username`),
	  UNIQUE KEY `users_username_unique` (`username`)
	);

create table assignments
	(
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `textfileroute` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	  `author` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	  `summary` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
	  `instructor` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
	  `createdAt` datetime NOT NULL,
	  `updatedAt` datetime NOT NULL,
	  PRIMARY KEY (`id`)
	);

create table comments
	(
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `foreignAssignment` int(11) NOT NULL,
	  `foreignUser` int(11) NOT NULL,
	  `comment` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
	  `startingLine` int(11) NOT NULL,
	  `endingLine` int(11) NOT NULL,
	  `createdAt` datetime NOT NULL,
	  `updatedAt` datetime NOT NULL,
	  PRIMARY KEY (`id`)
	);