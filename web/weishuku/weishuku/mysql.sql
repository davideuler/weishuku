CREATE TABLE `Book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `publisher` varchar(128) DEFAULT NULL,
  `isbn` char(13) NOT NULL,
  `url` varchar(128) DEFAULT NULL,
  `isPersonal` tinyint NOT NULL,
  `ownerid` int NOT NULL,
  `summary` varchar(1024) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `numRaters` varchar(45) DEFAULT NULL,
  `averageRate` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `borrowdate` timestamp NULL DEFAULT NULL,
  `author` varchar(128) DEFAULT NULL,
  `pubdate` varchar(45) DEFAULT NULL,
  `isPublic` tinyint DEFAULT NULL,
  `ImgURL` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


CREATE TABLE `BorrowRel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `BookID` int NOT NULL,
  `Owner` int NOT NULL,
  `Borrower` int NOT NULL,
  `Status` int NOT NULL, #0: not read; 1: not approved; 2: approved; 
  `CreateDate` timestamp NOT NULL,
  `DelDate` timestamp,
  `MessageID` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `Message` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `OriginID` int NOT NULL,
  `TargetID` int NOT NULL,
  `Status` int NOT NULL, #0: not read; 1: read; 
  `CreateDate` timestamp NOT NULL,
  `Content` varchar(256) NOT NULL,
  `Handler` varchar(256) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE `Tag` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreateDate` timestamp NOT NULL,
  `Value` varchar(256) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `BookTag` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `BookID` int NOT NULL,
  `TagID` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



