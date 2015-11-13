ALTER TABLE dailyEnergyPreNov7 ADD COLUMN `Main Power Main Panel` decimal(14,6);
ALTER TABLE dailyEnergyPreNov7 ADD COLUMN `Main Power Secondary Panel` decimal(14,6);
ALTER TABLE dailyEnergyPreNov7 ADD COLUMN `West Solar 1` decimal(14,6);
ALTER TABLE dailyEnergyPreNov7 ADD COLUMN `West Solar 2` decimal(14,6);
ALTER TABLE dailyEnergyPreNov7 ADD COLUMN `South Solar 1` decimal(14,6);
ALTER TABLE dailyEnergyPreNov7 ADD COLUMN `South Solar 2` decimal(14,6);
LOAD DATA LOCAL INFILE '/Users/thomasbottonari/Desktop/datadump.csv'
INTO TABLE dailyEnergyPreNov7
FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@`TS`,`Main Power Main Panel`,`West Solar 1`,`West Solar 2`,`Main Power Secondary Panel`,`South Solar 1`,`South Solar 2`)
SET  `TS` = STR_TO_DATE(@`TS`, '%c/%e/%y');