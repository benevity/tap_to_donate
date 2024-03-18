-- create database goodness_kiosk_rds;
use tap_to_donate;
ALTER TABLE `configs` DROP FOREIGN KEY `config_client_fk`;
ALTER TABLE `readers` DROP FOREIGN KEY `reader_client_fk`;
ALTER TABLE `reader_config_assignment` DROP FOREIGN KEY `reader_conf_config_fk`;
ALTER TABLE `reader_config_assignment` DROP FOREIGN KEY `reader_conf_reader_fk`;
ALTER TABLE `donation_records` DROP FOREIGN KEY `donation_record_reader_fk`;


DROP TABLE IF EXISTS clients;
CREATE TABLE clients(
                        client_id	varchar(50) NOT NULL,
                        name	varchar(50) NOT NULL,
                        app_client_id	varchar(100) NOT NULL,
                        created_dts	datetime default NOW(),
                        deactivated_dts	datetime,
                        PRIMARY KEY	(client_id)
);

DROP TABLE IF EXISTS configs;
CREATE TABLE configs(
                        config_id	int NOT NULL auto_increment,
                        name	varchar(250),
                        title	varchar(250),
                        summary	varchar(500),
                        operating_mode	int NOT NULL,
                        recipient_id	varchar(30),
                        amount	int,
                        start_dts	datetime,
                        end_dts	datetime,
                        created_dts	datetime default NOW(),
                        deactivated_dts	datetime,
                        client_id	varchar(50),
                        PRIMARY KEY (config_id),
                        CONSTRAINT `config_client_fk` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
);

DROP TABLE IF EXISTS readers;
CREATE TABLE readers(
                        reader_serial_number	varchar(50) NOT NULL,
                        label	varchar(50),
                        location	varchar(100),
                        location_address	varchar(100),
                        activated_dts	datetime default NOW(),
                        deactivated_dts	datetime,
                        client_id	varchar(50),
                        PRIMARY KEY (reader_serial_number),
                        CONSTRAINT `reader_client_fk` FOREIGN KEY (client_id) references clients(client_id)
);

DROP TABLE IF EXISTS reader_config_assignment;
CREATE TABLE reader_config_assignment(
                                         assign_id	int not null auto_increment,
                                         assigned_dts	datetime default NOW(),
                                         deactivated_dts	datetime,
                                         config_id	int,
                                         reader_serial_number	varchar(50),
                                         PRIMARY KEY (assign_id),
                                         CONSTRAINT `reader_conf_config_fk` FOREIGN KEY (config_id) references configs(config_id),
                                         CONSTRAINT `reader_conf_reader_fk` FOREIGN KEY (reader_serial_number) references readers(reader_serial_number)
);

DROP TABLE IF EXISTS donation_records;
CREATE TABLE donation_records(
                                 benevity_donation_id	varchar(50),
                                 stripe_payment_id	varchar(50),
                                 reader_serial_number	varchar(50),
                                 recipient_id	varchar(50),
                                 recipient_name	varchar(150),
                                 amount	int,
                                 currency	varchar(3),
                                 anonymous	tinyint(1),
                                 transaction_dts	datetime default NOW(),
                                 PRIMARY KEY (benevity_donation_id),
                                 CONSTRAINT `donation_record_reader_fk` FOREIGN KEY (reader_serial_number) References readers(reader_serial_number)
);

INSERT INTO `clients`
(`client_id`, `name`, `app_client_id`, `created_dts`, `deactivated_dts`)
Values('1', 'Nike','123appclientid','2022-01-01 12:05:45',NULL);

INSERT INTO `configs`
(`name`,`title`,`summary`,`operating_mode`,`recipient_id`,`amount`,`start_dts`,`end_dts`,`client_id`)
VALUES ('Test Config', 'Title Test Config', 'This is a summary', 1, '124-119259513RR0001', 500,'2022-01-02 12:05:45','2024-01-02 12:05:45', 1);

INSERT INTO `readers`
(`reader_serial_number`, `label`, `location`, `location_address`, `activated_dts`, `deactivated_dts`, `client_id`)
values ('WSC513128045685', 'WisePos_E reader#1','Benevity Office', '611 Meredith Rd NE', '2022-01-02 12:05:45',NULL,'1');

SELECT `config_id` INTO @configId
FROM `configs`
WHERE `client_id` = 1
LIMIT 1;

INSERT INTO `tap_to_donate`.`reader_config_assignment`
(`config_id`,`reader_serial_number`)
VALUES (@configId, 'WSC513128045685');

INSERT INTO `donation_records`
(`benevity_donation_id`,`stripe_payment_id`,`reader_serial_number`,`recipient_id`,`recipient_name`,`amount`,`currency`,`anonymous`)
VALUES (1, 1, 'WSC513128045685', '124-119259513RR0001', 'TORONTO HUMANE SOCIETY', 50,'CAD',1);
