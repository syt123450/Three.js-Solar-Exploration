# For formal use
CREATE TABLE EnergyAmount (
  energyID INT NOT NULL,
  countryID INT NOT NULL,
  year INT NOT NULL,
  unitID INT NOT NULL,
  amount DOUBLE(15,5) NOT NULL,
  PRIMARY KEY (energyID, countryID, year)
);

CREATE TABLE Energy (
  energyID INT NOT NULL AUTO_INCREMENT,
  energyName VARCHAR(100),
  PRIMARY KEY (energyID)
);

CREATE TABLE Unit (
  unitID INT NOT NULL AUTO_INCREMENT,
  unitName VARCHAR(100),
  PRIMARY KEY (unitID)
);

# Used for generating AreaGeography table (Deprecated as temp for AreaGeography)
CREATE TABLE Country (
  countryID INT NOT NULL AUTO_INCREMENT,
  countryName VARCHAR(100),
  PRIMARY KEY (countryID)
);

# Used for generating countryGeo table (temp table for AreaGeography)
CREATE TABLE countryGeo (
  countryName VARCHAR(100) NOT NULL,
  longitude DOUBLE(15,10) NOT NULL,
  latitude DOUBLE(15,10) NOT NULL,
  PRIMARY KEY (countryName)
);

# Used for generating Geography table (Deprecated, replaced by AreaGeography)
CREATE TABLE Geography (
  geographyID INT NOT NULL AUTO_INCREMENT,
  longitude DOUBLE(15, 10) NOT NULL,
  latitude DOUBLE(15, 10) NOT NULL,
  altitude DOUBLE(15, 10) DEFAULT 0,
  countryID INT NOT NULL,
  PRIMARY KEY (geographyID)
);

# Used for generating AreaGeography table
CREATE TABLE AreaGeography (
  areaID INT NOT NULL AUTO_INCREMENT,
  areaName VARCHAR(100) NOT NULL,
  longitude DOUBLE(15,10) DEFAULT 0,
  latitude DOUBLE(15,10) DEFAULT 0,
  altitude DOUBLE(15,10) DEFAULT 0,
  PRIMARY KEY (areaID)
);


# For data collection and hash map style use
CREATE TABLE NaturalGas (
  countryName VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  amount DOUBLE(15,5) NOT NULL,
  PRIMARY KEY (countryName, year)
);
CREATE TABLE CrudeOil (
  countryName VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  amount DOUBLE(15,5) NOT NULL,
  PRIMARY KEY (countryName, year)
);
CREATE TABLE Coal (
  countryName VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  amount DOUBLE(15,5) NOT NULL,
  PRIMARY KEY (countryName, year)
);

