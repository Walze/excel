-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

DROP TABLE `contador_linha`;


DROP TABLE `card`;


DROP TABLE `grupo_linha`;


DROP TABLE `pessoa`;


DROP TABLE `vaga`;


DROP TABLE `fonte`;


DROP TABLE `dias`;


DROP TABLE `linha`;


DROP TABLE `grupo`;



-- ************************************** `pessoa`

CREATE TABLE `pessoa`
(
 `id`   INT NOT NULL AUTO_INCREMENT ,
 `nome` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`id`)
);






-- ************************************** `vaga`

CREATE TABLE `vaga`
(
 `id`   INT NOT NULL AUTO_INCREMENT ,
 `nome` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`id`)
);






-- ************************************** `fonte`

CREATE TABLE `fonte`
(
 `id`   INT NOT NULL AUTO_INCREMENT ,
 `nome` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`id`)
);






-- ************************************** `dias`

CREATE TABLE `dias`
(
 `dia` DATE NOT NULL ,

PRIMARY KEY (`dia`)
);






-- ************************************** `linha`

CREATE TABLE `linha`
(
 `id`   INT NOT NULL AUTO_INCREMENT ,
 `nome` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`id`)
);






-- ************************************** `grupo`

CREATE TABLE `grupo`
(
 `id`   INT NOT NULL AUTO_INCREMENT ,
 `nome` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`id`)
);






-- ************************************** `card`

CREATE TABLE `card`
(
 `fonte_id`  INT NOT NULL ,
 `dia`       DATE NOT NULL ,
 `pessoa_id` INT NOT NULL ,
 `vaga_nome` INT NOT NULL ,

PRIMARY KEY (`fonte_id`, `dia`, `pessoa_id`, `vaga_nome`),
KEY `fkIdx_37` (`fonte_id`),
CONSTRAINT `FK_37` FOREIGN KEY `fkIdx_37` (`fonte_id`) REFERENCES `fonte` (`id`),
KEY `fkIdx_40` (`dia`),
CONSTRAINT `FK_40` FOREIGN KEY `fkIdx_40` (`dia`) REFERENCES `dias` (`dia`),
KEY `fkIdx_61` (`pessoa_id`),
CONSTRAINT `FK_61` FOREIGN KEY `fkIdx_61` (`pessoa_id`) REFERENCES `pessoa` (`id`),
KEY `fkIdx_64` (`vaga_nome`),
CONSTRAINT `FK_64` FOREIGN KEY `fkIdx_64` (`vaga_nome`) REFERENCES `vaga` (`id`)
);






-- ************************************** `grupo_linha`

CREATE TABLE `grupo_linha`
(
 `grupo_id`  INT NOT NULL ,
 `id`        INT NOT NULL AUTO_INCREMENT ,
 `linha_id` INT NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_11` (`grupo_id`),
CONSTRAINT `FK_11` FOREIGN KEY `fkIdx_11` (`grupo_id`) REFERENCES `grupo` (`id`),
KEY `fkIdx_15` (`linha_id`),
CONSTRAINT `FK_15` FOREIGN KEY `fkIdx_15` (`linha_id`) REFERENCES `linha` (`id`)
);






-- ************************************** `contador_linha`

CREATE TABLE `contador_linha`
(
 `grupo_linha_id` INT NOT NULL ,
 `contador`        INT NOT NULL ,
 `dia`             DATE NOT NULL ,

PRIMARY KEY (`grupo_linha_id`),
KEY `fkIdx_29` (`dia`),
CONSTRAINT `FK_29` FOREIGN KEY `fkIdx_29` (`dia`) REFERENCES `dias` (`dia`),
KEY `fkIdx_45` (`grupo_linha_id`),
CONSTRAINT `FK_45` FOREIGN KEY `fkIdx_45` (`grupo_linha_id`) REFERENCES `grupo_linha` (`id`)
);





