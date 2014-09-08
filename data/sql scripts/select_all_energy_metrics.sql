SELECT t2.date as date, t1.gas_val as gas_val, COALESCE(t2.val + t1.gas_val, t2.val) as val, t2.val2 as val2
FROM (SELECT date(TS) as date, 
	CAST(SUM((`Gas_Furn` + 
		`Gas_WH`) *127 / 24 / 1000) AS DECIMAL(10,2)) AS gas_val FROM tempdata GROUP BY date(TS)) as t1
RIGHT JOIN (SELECT date(`Date/Time`) as date, 
	CAST(SUM((`CH2-Main Power` + 
		`CH3-Main Power`) / 60 / 1000) AS DECIMAL(10,2)) AS val, 
	CAST(SUM((`CH2-Main Power` + 
		`CH3-Main Power`) * 0.5 / 60 / 1000) AS DECIMAL(10,2)) AS val2 FROM eMonitor_test GROUP BY date(`Date/Time`)) as t2
ON t1.date=t2.date;