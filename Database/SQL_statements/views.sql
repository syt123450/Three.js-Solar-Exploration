 /*
  * Units for existed energy types in DB
  *     Coal        ==>   Million Short Ton       ==>   (0.907 * 10^6) t
  *     Crude Oil   ==>   Billion Barrels         ==>   (10^9) Barrels
  *     Natural Gas ==>   Trillion Cubic Feet     ==>   (10^12) Cubic Feet
  *
  *     General Energy Unit ==> BTU
  * Energy for existed energy types in DB
  *     Coal        ==>   (25 * 10^6) BTU/t       ==>   (0.0227 * 10^15) BTU    ==>   0.0227 Quadrillion (Peta) BTU
  *     Crude Oil   ==>   (5.6 * 10^6) BTU/Barrel ==>   (5.6 * 10^15) BTU       ==>   5.6 Quadrillion (Peta) BTU
  *     Natural Gas ==>   1030 BTU/Cubic Feet     ==>   (1.03 * 10^15) BTU      ==>   1.03 Quadrillion (Peta) BTU
  *
  */
CREATE OR REPLACE VIEW v_TotalEnergy AS
      (
        SELECT
              co.countryName as areaName,
              ag.latitude as latitude,
              ag.longitude as longitude,
              co.year as year,
              IFNULL(c.amount, 0) as Coal_Amount,
              IFNULL(co.amount, 0) as CrudeOil_Amount,
              IFNULL(ng.amount, 0) as NaturalGas_Amount,
              (IFNULL(c.amount, 0)*0.0227 + IFNULL(co.amount, 0)*5.6 + IFNULL(ng.amount, 0)*1.03) as Quadrillion_BTU
        FROM
              CrudeOil co
        LEFT JOIN
              Coal c
            ON
              co.countryName = c.countryName
            AND
              co.year = c.year
        LEFT JOIN
              NaturalGas ng
            ON
              co.countryName = ng.countryName
            AND
              co.year = ng.year
        LEFT JOIN
              AreaGeography ag
            ON
              co.countryName = ag.areaName
      );

-- Coal View
CREATE OR REPLACE VIEW v_Coal AS
      (
            SELECT
                  ag.areaName, ag.latitude, ag.longitude,
                  c.year, c.amount
            FROM
                  AreaGeography ag, Coal c
            WHERE
                  ag.areaName = c.countryName
      );

-- Crude Oil View
CREATE OR REPLACE VIEW v_CrudeOil AS
      (
            SELECT
                  ag.areaName, ag.latitude, ag.longitude,
                  co.year, co.amount
            FROM
                  AreaGeography ag, CrudeOil co
            WHERE
                  ag.areaName = co.countryName
      );

-- Natural Gas View
CREATE OR REPLACE VIEW v_NaturalGas AS
      (
            SELECT
                  ag.areaName, ag.latitude, ag.longitude,
                 ng.year, ng.amount
            FROM
                  AreaGeography ag, NaturalGas ng
            WHERE
                  ag.areaName = ng.countryName
      );
