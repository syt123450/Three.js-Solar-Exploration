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

CREATE TABLE Country (
  countryID INT NOT NULL AUTO_INCREMENT,
  countryName VARCHAR(100),
  PRIMARY KEY (countryID)
);

CREATE TABLE Unit (
  unitID INT NOT NULL AUTO_INCREMENT,
  unitName VARCHAR(100),
  PRIMARY KEY (unitID)
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

