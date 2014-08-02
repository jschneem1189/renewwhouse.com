SELECT SUM(`CH1-Inactive`) + 
	SUM(`CH2-Main Power`) + 
	SUM(`CH3-Main Power`) + 
	SUM(`CH4-Oven`) + 
	SUM(`CH5-Oven`) + 
	SUM(`CH6-Furnace closet light`) + 
	SUM(`CH7-Office outlet`) + 
	SUM(`CH8-Basement outlets and lights`) + 
	SUM(`CH9-Office outlet{1}`) + 
	SUM(`CH10-Dining Room outlets`) + 
	SUM(`CH11-Basement closet light`) + 
	SUM(`CH12-Basement lights`) + 
	SUM(`CH13-Living Room outlet`) + 
	SUM(`CH14-Air Conditioner`) + 
	SUM(`CH15-Air Conditioner`) + 
	SUM(`CH16-Basement outlet`) + 
	SUM(`CH17-Basement lights{1}`) + 
	SUM(`CH18-First Floor lights and outlets`) + 
	SUM(`CH19-Kitchen outlet`) + 
	SUM(`CH20-clothes dryer`) + 
	SUM(`CH21-clothes dryer`) + 
	SUM(`CH22-Second Floor lights and outlets`) + 
	SUM(`CH23-S bedroom outlet`) + 
	SUM(`CH24-First floor outlets and lights`) + 
	SUM(`CH25-East bedroom outlets`) + 
	SUM(`CH26-Second Floor outlets`) + 
	SUM(`CH27-Refrigerator`) + 
	SUM(`CH28-Inactive`) + 
	SUM(`CH29-Inactive`) + 
	SUM(`CH30-Inactive`) + 
	SUM(`CH31-Inactive`) + 
	SUM(`CH32-Inactive`) + 
	SUM(`CH33-Inactive`) + 
	SUM(`CH34-Inactive`) + 
	SUM(`CH35-Inactive`) + 
	SUM(`CH36-Inactive`) + 
	SUM(`CH37-Inactive`) + 
	SUM(`CH38-Inactive`) + 
	SUM(`CH39-Inactive`) + 
	SUM(`CH40-Inactive`) + 
	SUM(`CH41-Inactive`) + 
	SUM(`CH42-Inactive`) + 
	SUM(`CH43-Inactive`) + 
	SUM(`CH44-Inactive`) + 
	SUM(`CH45-Inactive`) / 1000 AS sum FROM eMonitor 
WHERE `Date/Time` >= '2013-01-01'
AND `Date/Time` <= '2013-12-31'