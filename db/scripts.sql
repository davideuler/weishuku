SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `weishuku` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `weishuku` ;

-- -----------------------------------------------------
-- Table `weishuku`.`User`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `weishuku`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(45) NOT NULL ,
  `name` VARCHAR(45) NULL ,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  `profile` VARCHAR(45) NULL ,
  `url` VARCHAR(45) NULL ,
  `first_login_date` TIMESTAMP NULL ,
  `last_login_date` TIMESTAMP NULL ,
  `phone` VARCHAR(45) NULL ,
  `sha1pass` VARCHAR(200) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `weishuku`.`Group`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `weishuku`.`Group` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `groupname` VARCHAR(45) NULL ,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  `isprivate` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `weishuku`.`UserGroup`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `weishuku`.`UserGroup` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `userid` VARCHAR(45) NULL ,
  `groupid` VARCHAR(45) NULL ,
  `isowner` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `weishuku`.`Book`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `weishuku`.`Book` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(105) NOT NULL ,
  `publisher` VARCHAR(45) NULL ,
  `isbn` VARCHAR(45) NOT NULL ,
  `url` VARCHAR(45) NULL ,
  `isPersonal` VARCHAR(45) NOT NULL ,
  `ownerid` VARCHAR(45) NOT NULL COMMENT 'when the book is personal, the owner id is a user id. when the book is not personal, the owner id is group id.' ,
  `summary` VARCHAR(45) NULL ,
  `price` VARCHAR(45) NULL ,
  `numRaters` VARCHAR(45) NULL ,
  `averageRate` VARCHAR(45) NULL ,
  `created_date` TIMESTAMP NULL ,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `borrowdate` TIMESTAMP NULL ,
  `author` VARCHAR(45) NULL ,
  `pubdate` VARCHAR(45) NULL ,
  `isPublic` VARCHAR(45) NULL ,
  `imgurl` VARCHAR(200) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `weishuku`.`BorrowInfo`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `weishuku`.`BorrowInfo` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `userid` VARCHAR(45) NULL ,
  `bookid` VARCHAR(45) NULL ,
  `booktitle` VARCHAR(45) NULL ,
  `borrowdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `returndate` TIMESTAMP NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `weishuku`.`BookTag`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `weishuku`.`BookTag` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `bookid` VARCHAR(45) NULL ,
  `tagname` VARCHAR(45) NULL ,
  `userid` VARCHAR(45) NULL ,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

USE `weishuku` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
