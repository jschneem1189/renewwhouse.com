LOAD DATA LOCAL INFILE '/Users/thomasbottonari/github/thomasbottonari.github.io/data/LabView/CSV_data/Data_Feb24_2014.csv'
INTO TABLE tempdata
FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 0 ROWS
(@`Time Stamp`,`Kitchen`,`Office`,`Living Rm`,`Bath 2nd`,`empty`,`Roof`,`Attic`,`Basement`,`Ext_wall`,`Int_wall`,`Ext_win`,`Int_win`,`Drain_Kit`,`Drain_Wash`,`Drain_B2`,`Drain_B1`,`RH_Kit`,`RH_Dining`,`RH_Office`,`RH_B1`,`RH_Living`,`RH_Ebed`,`RH_Nbed`,`RH_Sbed`,`RH_B2`,`Gas_Furn`,`Gas_WH`)
#SET  `Time Stamp` = STR_TO_DATE(@`Time Stamp`, '%m/%d/%Y %h:%i:%s %p');
SET  `Time Stamp` = STR_TO_DATE(@`Time Stamp`, '%m/%d/%Y %H:%i:%s');