-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema neighbornetdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `neighbornetdb` ;

-- -----------------------------------------------------
-- Schema neighbornetdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `neighbornetdb` DEFAULT CHARACTER SET utf8 ;
USE `neighbornetdb` ;

-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `postal_code` INT NOT NULL,
  `country` VARCHAR(45) NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(45) NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(80) NULL,
  `create_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `image_url` VARCHAR(2000) NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_user_address1_idx` (`address_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report_category` ;

CREATE TABLE IF NOT EXISTS `report_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `severity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `severity` ;

CREATE TABLE IF NOT EXISTS `severity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `level` INT NULL,
  `image_url` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report` ;

CREATE TABLE IF NOT EXISTS `report` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `create_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `image_url` VARCHAR(2000) NULL,
  `event_date` DATETIME NULL,
  `event_date_end` DATETIME NULL,
  `resolved` TINYINT NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  `address_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `report_category_id` INT NOT NULL,
  `severity_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_report_address1_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_report_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_report_report_category1_idx` (`report_category_id` ASC) VISIBLE,
  INDEX `fk_report_severity1_idx` (`severity_id` ASC) VISIBLE,
  CONSTRAINT `fk_report_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_report_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_report_report_category1`
    FOREIGN KEY (`report_category_id`)
    REFERENCES `report_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_report_severity1`
    FOREIGN KEY (`severity_id`)
    REFERENCES `severity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report_image` ;

CREATE TABLE IF NOT EXISTS `report_image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(200) NULL,
  `image_url` VARCHAR(2000) NULL,
  `create_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `enabled` TINYINT NOT NULL,
  `report_id` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_report_image_report1_idx` (`report_id` ASC) VISIBLE,
  CONSTRAINT `fk_report_image_report1`
    FOREIGN KEY (`report_id`)
    REFERENCES `report` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `body` TEXT NOT NULL,
  `create_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `image_url` VARCHAR(2000) NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  `report_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `in_reply_to_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_post1_idx` (`report_id` ASC) VISIBLE,
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_comment1_idx` (`in_reply_to_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`report_id`)
    REFERENCES `report` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_comment1`
    FOREIGN KEY (`in_reply_to_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `direct_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `direct_message` ;

CREATE TABLE IF NOT EXISTS `direct_message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `body` TEXT NULL,
  `create_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `enabled` TINYINT NULL,
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_direct_message_user1_idx` (`sender_id` ASC) VISIBLE,
  INDEX `fk_direct_message_user2_idx` (`recipient_id` ASC) VISIBLE,
  CONSTRAINT `fk_direct_message_user1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_direct_message_user2`
    FOREIGN KEY (`recipient_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report_tag` ;

CREATE TABLE IF NOT EXISTS `report_tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tag_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report_has_report_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report_has_report_tag` ;

CREATE TABLE IF NOT EXISTS `report_has_report_tag` (
  `report_id` INT NOT NULL,
  `report_tag_id` INT NOT NULL,
  PRIMARY KEY (`report_id`, `report_tag_id`),
  INDEX `fk_report_has_report_tag_report_tag1_idx` (`report_tag_id` ASC) VISIBLE,
  INDEX `fk_report_has_report_tag_report1_idx` (`report_id` ASC) VISIBLE,
  CONSTRAINT `fk_report_has_report_tag_report1`
    FOREIGN KEY (`report_id`)
    REFERENCES `report` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_report_has_report_tag_report_tag1`
    FOREIGN KEY (`report_tag_id`)
    REFERENCES `report_tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_has_report_liked`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_report_liked` ;

CREATE TABLE IF NOT EXISTS `user_has_report_liked` (
  `user_id` INT NOT NULL,
  `report_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `report_id`),
  INDEX `fk_user_has_report_report1_idx` (`report_id` ASC) VISIBLE,
  INDEX `fk_user_has_report_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_report_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_report_report1`
    FOREIGN KEY (`report_id`)
    REFERENCES `report` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS eventuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'eventuser'@'localhost' IDENTIFIED BY 'eventuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'eventuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (1, 'McDonald\'s', '2214 W 76 Country Blvd', 'Branson', 'MO', 65616, 'United States', 1);
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (2, 'McDonald\'s', '515 W Main St', 'Branson', 'MO', 65616, 'United States', 1);
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (3, 'McDonald\'s', '1209 Branson Hills Pkwy', 'Branson ', 'MO', 65616, 'United States', 1);
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (4, 'Starbucks', '201 E Main St', 'Branson', 'MO', 65616, 'United States', 1);
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (5, 'Starbucks', '3460 W 76 Country Blvd', 'Branson ', 'MO', 65616, 'United States', 1);
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (6, 'John\'s home', '176 Fremont St', 'Branson', 'MO', 65616, 'United States', 1);
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (7, 'Jane\'s home', '651 Taneycomo Rd', 'Branson', 'MO', 65616, 'United States', 1);
INSERT INTO `address` (`id`, `name`, `street`, `city`, `state`, `postal_code`, `country`, `enabled`) VALUES (8, 'Mr. Anon\'s home', '491 Compton Ridge Rd', 'Branson', 'MO', 65616, 'United States', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`, `first_name`, `last_name`, `email`, `create_date`, `modified_date`, `image_url`, `address_id`) VALUES (1, 'test', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 'standard', 1, 'John', 'Doe', 'jdoe@gmail.com', '2024-09-26 11:50:00', NULL, NULL, 6);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`, `first_name`, `last_name`, `email`, `create_date`, `modified_date`, `image_url`, `address_id`) VALUES (2, 'jdoe', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 'admin', 1, 'Jane', 'Doe', 'janedoe@gmail.com', '2024-09-26 11:51:00', NULL, NULL, 7);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`, `first_name`, `last_name`, `email`, `create_date`, `modified_date`, `image_url`, `address_id`) VALUES (3, 'janon', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 'standard', 1, 'John', 'Anon', 'janon@gmail.com', '2024-09-26 11:52:00', NULL, NULL, 8);
INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`, `first_name`, `last_name`, `email`, `create_date`, `modified_date`, `image_url`, `address_id`) VALUES (4, 'mcdonalds', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 'standard', 1, 'McDonalds', 'McDonalds', 'mc@example.com', '2024-09-26 16:00:00', NULL, NULL, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `report_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `report_category` (`id`, `name`, `description`, `image_url`) VALUES (1, 'Weather', 'Reports related to weather events', NULL);
INSERT INTO `report_category` (`id`, `name`, `description`, `image_url`) VALUES (2, 'Suspicous Activity', 'Reports related to suspicous activity', NULL);
INSERT INTO `report_category` (`id`, `name`, `description`, `image_url`) VALUES (3, 'Traffic', 'Reports related to traffic issues', NULL);
INSERT INTO `report_category` (`id`, `name`, `description`, `image_url`) VALUES (4, 'Criminal Activity', 'Reports related to criminal activity', NULL);
INSERT INTO `report_category` (`id`, `name`, `description`, `image_url`) VALUES (5, 'Community Event', 'Reports related to public events and gatherings', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `severity`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `severity` (`id`, `name`, `level`, `image_url`) VALUES (1, 'Extreme', 10, NULL);
INSERT INTO `severity` (`id`, `name`, `level`, `image_url`) VALUES (2, 'High', 8, NULL);
INSERT INTO `severity` (`id`, `name`, `level`, `image_url`) VALUES (3, 'Moderate', 5, NULL);
INSERT INTO `severity` (`id`, `name`, `level`, `image_url`) VALUES (4, 'Low', 3, NULL);
INSERT INTO `severity` (`id`, `name`, `level`, `image_url`) VALUES (5, 'None', 0, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `report`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `report` (`id`, `name`, `description`, `create_date`, `modified_date`, `image_url`, `event_date`, `event_date_end`, `resolved`, `enabled`, `address_id`, `user_id`, `report_category_id`, `severity_id`) VALUES (1, 'Traffic jam!', 'Congested traffic due to road closure.', '2024-09-26 11:55:00', NULL, NULL, '2024-09-26 11:54:00', NULL, NULL, 1, 2, 1, 3, 2);
INSERT INTO `report` (`id`, `name`, `description`, `create_date`, `modified_date`, `image_url`, `event_date`, `event_date_end`, `resolved`, `enabled`, `address_id`, `user_id`, `report_category_id`, `severity_id`) VALUES (2, 'Suspicous person...', 'Person loitering outside of McDonald\'s', '2024-09-26 11:58:00', NULL, NULL, '2024-09-26 11:57:00', NULL, NULL, 1, 1, 1, 2, 3);
INSERT INTO `report` (`id`, `name`, `description`, `create_date`, `modified_date`, `image_url`, `event_date`, `event_date_end`, `resolved`, `enabled`, `address_id`, `user_id`, `report_category_id`, `severity_id`) VALUES (3, 'Block party on Sunday!', 'Block party - invite your friends!', '2024-09-26 11:59:00', NULL, NULL, '2024-09-29 14:00:00', NULL, NULL, 1, 6, 1, 5, null);

COMMIT;


-- -----------------------------------------------------
-- Data for table `report_image`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `report_image` (`id`, `name`, `description`, `image_url`, `create_date`, `modified_date`, `enabled`, `report_id`) VALUES (1, 'jam', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Trafficjamoninterstate5atpyramidlake.jpg/440px-Trafficjamoninterstate5atpyramidlake.jpg', '2024-09-26 11:55:00', NULL, 1, 1);
INSERT INTO `report_image` (`id`, `name`, `description`, `image_url`, `create_date`, `modified_date`, `enabled`, `report_id`) VALUES (2, NULL, NULL, 'https://ca-times.brightspotcdn.com/dims4/default/f759d43/2147483647/strip/true/crop/2048x1365+0+0/resize/1200x800!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff5%2Fa6%2Ff55c5143daf286a04f2d2c6ae9a6%2Fla-2419392-me-california-commute-5-ajs-jpg-20150209', '2024-09-26 11:55:00', NULL, 1, 1);
INSERT INTO `report_image` (`id`, `name`, `description`, `image_url`, `create_date`, `modified_date`, `enabled`, `report_id`) VALUES (3, 'block party', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Block_party_%28Manhattan%2C_October_4_2008%29.jpg/440px-Block_party_%28Manhattan%2C_October_4_2008%29.jpg', '2024-09-26 11:59:00', NULL, 1, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `comment` (`id`, `body`, `create_date`, `modified_date`, `image_url`, `enabled`, `report_id`, `user_id`, `in_reply_to_id`) VALUES (1, 'Thanks for the heads up!', '2024-09-26 11:57:00', NULL, NULL, 1, 1, 3, NULL);
INSERT INTO `comment` (`id`, `body`, `create_date`, `modified_date`, `image_url`, `enabled`, `report_id`, `user_id`, `in_reply_to_id`) VALUES (2, 'I think I have seen them before..', '2024-09-26 12:50:00', NULL, NULL, 1, 2, 2, NULL);
INSERT INTO `comment` (`id`, `body`, `create_date`, `modified_date`, `image_url`, `enabled`, `report_id`, `user_id`, `in_reply_to_id`) VALUES (3, 'Can\'t wait! We might not get there until 3PM.', '2024-09-26 13:30:00', NULL, NULL, 1, 3, 2, NULL);
INSERT INTO `comment` (`id`, `body`, `create_date`, `modified_date`, `image_url`, `enabled`, `report_id`, `user_id`, `in_reply_to_id`) VALUES (4, 'No problem!', '2024-09-26 14:30:00', NULL, NULL, 1, 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `direct_message`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `direct_message` (`id`, `title`, `body`, `create_date`, `modified_date`, `enabled`, `sender_id`, `recipient_id`) VALUES (1, 'Hey Neighbor', 'I had a quick follow up question regarding your post the other day.', '2024-09-26 16:50:00', NULL, 1, 3, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `report_tag`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `report_tag` (`id`, `tag_name`) VALUES (1, 'Tornado');
INSERT INTO `report_tag` (`id`, `tag_name`) VALUES (2, 'Suspicous');
INSERT INTO `report_tag` (`id`, `tag_name`) VALUES (3, 'Party');
INSERT INTO `report_tag` (`id`, `tag_name`) VALUES (4, 'Community');
INSERT INTO `report_tag` (`id`, `tag_name`) VALUES (5, 'Food');

COMMIT;


-- -----------------------------------------------------
-- Data for table `report_has_report_tag`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `report_has_report_tag` (`report_id`, `report_tag_id`) VALUES (2, 2);
INSERT INTO `report_has_report_tag` (`report_id`, `report_tag_id`) VALUES (3, 3);
INSERT INTO `report_has_report_tag` (`report_id`, `report_tag_id`) VALUES (3, 4);
INSERT INTO `report_has_report_tag` (`report_id`, `report_tag_id`) VALUES (3, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_has_report_liked`
-- -----------------------------------------------------
START TRANSACTION;
USE `neighbornetdb`;
INSERT INTO `user_has_report_liked` (`user_id`, `report_id`) VALUES (3, 1);

COMMIT;

