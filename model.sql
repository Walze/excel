-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

DROP TABLE `contador_linha`;


DROP TABLE `processo`;


DROP TABLE `grupo_linha`;


DROP TABLE `vaga`;


DROP TABLE `linha`;


DROP TABLE `grupo`;



-- ************************************** `vaga`

CREATE TABLE `vaga`
(
 `id`   INT NOT NULL AUTO_INCREMENT ,
 `nome` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`id`)
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






-- ************************************** `processo`

CREATE TABLE `processo`
(
 `id`      INT NOT NULL AUTO_INCREMENT ,
 `fontes`  VARCHAR(255) NOT NULL ,
 `pessoas` VARCHAR(255) NOT NULL ,
 `vaga_id` INT NOT NULL ,
 `dia`     DATE NOT NULL ,

PRIMARY KEY (`id`),
UNIQUE KEY `processo` (`dia`, `vaga_id`),
KEY `fkIdx_112` (`vaga_id`),
CONSTRAINT `FK_112` FOREIGN KEY `fkIdx_112` (`vaga_id`) REFERENCES `vaga` (`id`)
);






-- ************************************** `grupo_linha`

CREATE TABLE `grupo_linha`
(
 `grupo_id` INT NOT NULL ,
 `id`       INT NOT NULL AUTO_INCREMENT ,
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
 `processo_id`    INT NOT NULL ,
 `contador`       INT NOT NULL ,

PRIMARY KEY (`grupo_linha_id`, `processo_id`),
KEY `fkIdx_45` (`grupo_linha_id`),
CONSTRAINT `FK_45` FOREIGN KEY `fkIdx_45` (`grupo_linha_id`) REFERENCES `grupo_linha` (`id`),
KEY `fkIdx_80` (`processo_id`),
CONSTRAINT `FK_80` FOREIGN KEY `fkIdx_80` (`processo_id`) REFERENCES `processo` (`id`)
);





