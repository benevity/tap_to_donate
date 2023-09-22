create database goodness_kiosk_rds;
use goodness_kiosk_rds;

DROP TABLE IF EXISTS clients;
CREATE TABLE clients(
client_id	varchar(50) NOT NULL,
name	varchar(50) NOT NULL,
app_client_id	varchar(100) NOT NULL,
created_dts	datetime,
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
created_dts	datetime,
deactivated_dts	datetime,
client_id	varchar(50),
PRIMARY KEY (config_id),
FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

DROP TABLE IF EXISTS readers;
CREATE TABLE readers(
reader_serial_number	varchar(50) NOT NULL,
label	varchar(50),
location	varchar(100),
location_address	varchar(100),
activated_dts	datetime,
deactivated_dts	datetime,
client_id	varchar(50),
PRIMARY KEY (reader_serial_number),
FOREIGN KEY (client_id) references clients(client_id)
);

DROP TABLE IF EXISTS reader_config_assignment;
CREATE TABLE reader_config_assignment(
assign_id	int not null auto_increment,
assigned_dts	datetime,
deactivated_dts	datetime,
config_id	int,
reader_serial_number	varchar(50),
PRIMARY KEY (assign_id),
FOREIGN KEY (config_id) references configs(config_id),
FOREIGN KEY (reader_serial_number) references readers(reader_serial_number)
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
transaction_dts	datetime,
PRIMARY KEY (benevity_donation_id),
FOREIGN KEY (reader_serial_number) References readers(reader_serial_number)
);

INSERT INTO clients( client_id, name, app_client_id, created_dts, deactivated_dts)
Values('1', 'Nike','123appclientid','2022-01-01 12:05:45',NULL);

Insert INTO readers(reader_serial_number, label, location, location_address,activated_dts,deactivated_dts,client_id)
values ('WSC513128045685', 'WisePos_E reader#1','Benevity Office', '611 Meredith Rd NE', '2022-01-02 12:05:45',NULL,'1');
