ALTER TABLE `retrospective`.`note` CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE `retrospective`.`note` MODIFY COLUMN `comment` VARCHAR(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL;
ALTER TABLE `retrospective`.`session` CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE `retrospective`.`session` MODIFY COLUMN `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL;
