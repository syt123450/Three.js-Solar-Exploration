
CREATE DATABASE cmpe202;

CREATE USER 'cmpe202usr'@'localhost' IDENTIFIED BY 'sesame';
GRANT ALL ON cmpe202.* TO 'cmpe202usr'@'localhost';