-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET @@session.restrict_fk_on_non_standard_key=OFF;
-- -----------------------------------------------------
-- Schema integrated_services
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema integrated_services
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `integrated_services` DEFAULT CHARACTER SET utf8 ;
USE `integrated_services` ;

-- -----------------------------------------------------
-- Table `integrated_services`.`profile_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`profile_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `upload_path` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`plan_benefits`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`plan_benefits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `benefits` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`plan_name`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`plan_name` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` ENUM("free", "plus") NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`plan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_id` INT NOT NULL,
  `price` INT NOT NULL DEFAULT 1,
  `benefit_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_plan_plan_benefits1_idx` (`benefit_id` ASC) VISIBLE,
  INDEX `fk_plan_plan_name1_idx` (`name_id` ASC) VISIBLE,
  CONSTRAINT `fk_plan_plan_benefits1`
    FOREIGN KEY (`benefit_id`)
    REFERENCES `integrated_services`.`plan_benefits` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_plan_plan_name1`
    FOREIGN KEY (`name_id`)
    REFERENCES `integrated_services`.`plan_name` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`user` (
  `id` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `profile_image_id` INT NULL,
  `plan_id` INT NOT NULL,
  `status` ENUM("normal", "stopped") NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_user_profile_image_idx` (`profile_image_id` ASC) VISIBLE,
  INDEX `fk_user_plan1_idx` (`plan_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_profile_image`
    FOREIGN KEY (`profile_image_id`)
    REFERENCES `integrated_services`.`profile_images` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_plan1`
    FOREIGN KEY (`plan_id`)
    REFERENCES `integrated_services`.`plan` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`article_thumbnails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`article_thumbnails` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `upload_path` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`article_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`article_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `upload_path` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`article_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`article_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `category_id` INT NOT NULL,
  `article_thumbnails_id` INT NULL,
  `title` VARCHAR(30) NOT NULL,
  `subtitle` VARCHAR(50) NOT NULL,
  `content` TEXT NOT NULL,
  `images_id` INT NULL,
  `created_at` DATE NOT NULL,
  `views` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_article_article_thumbnails1_idx` (`article_thumbnails_id` ASC) VISIBLE,
  INDEX `fk_article_article_images1_idx` (`images_id` ASC) VISIBLE,
  INDEX `fk_article_article_category1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_article_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_article_thumbnails1`
    FOREIGN KEY (`article_thumbnails_id`)
    REFERENCES `integrated_services`.`article_thumbnails` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_article_article_images1`
    FOREIGN KEY (`images_id`)
    REFERENCES `integrated_services`.`article_images` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_article_article_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `integrated_services`.`article_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_article_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`page`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`page` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `upload_path` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_page_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_page_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `article_id` INT NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_article1_idx` (`article_id` ASC) VISIBLE,
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_article1`
    FOREIGN KEY (`article_id`)
    REFERENCES `integrated_services`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`calendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`calendar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `content` TEXT NULL,
  `event_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_calendar_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_calendar_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`project_colums`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`project_colums` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`project_rows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`project_rows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `column_id` INT NULL,
  `row_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_project_project_colums1_idx` (`column_id` ASC) VISIBLE,
  INDEX `fk_project_project_rows1_idx` (`row_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_project_colums1`
    FOREIGN KEY (`column_id`)
    REFERENCES `integrated_services`.`project_colums` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_project_project_rows1`
    FOREIGN KEY (`row_id`)
    REFERENCES `integrated_services`.`project_rows` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`article_view_perm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`article_view_perm` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `article_category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_view_perm_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_article_view_perm_article_category1_idx` (`article_category_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_view_perm_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_article_view_perm_article_category1`
    FOREIGN KEY (`article_category_id`)
    REFERENCES `integrated_services`.`article_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`default_setting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`default_setting` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `is_light_theme` ENUM("0", "1") NOT NULL DEFAULT '1',
  `is_list_view` ENUM("0", "1") NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `fk_default_setting_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_default_setting_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`terms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`terms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`project_collaborators`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`project_collaborators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(16) NOT NULL,
  `project_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_project_collaborators_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_project_collaborators_project1_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_collaborators_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_project_collaborators_project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `integrated_services`.`project` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrated_services`.`purchase_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrated_services`.`purchase_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `plan_id` INT NOT NULL,
  `user_id` VARCHAR(16) NOT NULL,
  `latest_purchase` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_purchase_history_plan1_idx` (`plan_id` ASC) VISIBLE,
  INDEX `fk_purchase_history_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_purchase_history_plan1`
    FOREIGN KEY (`plan_id`)
    REFERENCES `integrated_services`.`plan` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_purchase_history_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `integrated_services`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
