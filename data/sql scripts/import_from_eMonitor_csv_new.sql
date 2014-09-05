LOAD DATA LOCAL INFILE '/Users/thomasbottonari/github/thomasbottonari.github.io/data/eMonitor/Mar4-Mar18_2014_reformatted.csv'
INTO TABLE eMonitor
FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 8 ROWS
(@`Date/Time`,`CH1-Inactive`,`CH2-Main Power`,`CH3-Main Power`,`CH4-Oven`,`CH5-Oven`,`CH6-Furnace closet light`,`CH7-Office outlet`,`CH8-Basement outlets and lights`,`CH9-Office outlet{1}`,`CH10-Dining Room outlets`,`CH11-Basement closet light`,`CH12-Basement lights`,`CH13-Living Room outlet`,`CH14-Air Conditioner`,`CH15-Air Conditioner`,`CH16-Basement outlet`,`CH17-Basement lights{1}`,`CH18-First Floor lights and outlets`,`CH19-Kitchen outlet`,`CH20-clothes dryer`,`CH21-clothes dryer`,`CH22-Second Floor lights and outlets`,`CH23-S bedroom outlet`,`CH24-First floor outlets and lights`,`CH25-East bedroom outlets`,`CH26-Second Floor outlets`,`CH27-Refrigerator`,`CH28-Inactive`,`CH29-Inactive`,`CH30-Inactive`,`CH31-Inactive`,`CH32-Inactive`,`CH33-Inactive`,`CH34-Inactive`,`CH35-Inactive`,`CH36-Inactive`,`CH37-Inactive`,`CH38-Inactive`,`CH39-Inactive`,`CH40-Inactive`,`CH41-Inactive`,`CH42-Inactive`,`CH43-Inactive`,`CH44-Inactive`,`CH45-Inactive`,`14881/Voltage`,`Outdoor Temp`)
SET  `Date/Time` = STR_TO_DATE(@`Date/Time`, '%Y-%m-%d %H:%i:%s');
