ALTER TABLE `retrospective`.`note` CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE `retrospective`.`note` MODIFY COLUMN `comment` VARCHAR(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL;
