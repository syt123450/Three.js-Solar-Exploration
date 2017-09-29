
# CREATE VIEW TotalEnergy AS
SELECT
      c.countryName, c.year, c.amount, co.amount, ng.amount
FROM
      Coal c, CrudeOil co, NaturalGas ng
WHERE
      c.countryName = co.countryName
  AND c.year = co.year
  AND c.countryName = ng.countryName
  AND c.year = ng.year
