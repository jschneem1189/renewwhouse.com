<?php
// header('Access-Control-Allow-Origin: *');
// ini_set('memory_limit', '-1');
// $con = mysqli_connect('localhost','root',null,'house_data');
$con = mysqli_connect('localhost','reneww','renewwhouse','house_data');		// live site
// $con = mysqli_connect('23.229.157.253','reneww','renewwhouse','house_data'); // local testing
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$link = mysqli_select_db($con,"house_data");
if (!$link) {
	echo "not connected";
}

$sql_emonitor="SELECT date(`Date/Time`) as date, 
	CAST(SUM((`CH2-Main Power` + 
		`CH3-Main Power`) / 60 / 1000) AS DECIMAL(10,2)) AS val, 
	0 AS val2 FROM eMonitor GROUP BY date(`Date/Time`)";

$sql="SELECT t2.date as date, t1.gas_val as gas_val, COALESCE(t2.val + t1.gas_val, t2.val) as val, t2.val2 as val2
FROM (SELECT date(`Time Stamp`) as date, 
	CAST(SUM((`Gas_Furn` + 
		`Gas_WH`) * 127 / 60 / 1000) AS DECIMAL(10,2)) AS gas_val FROM tempdata GROUP BY date(`Time Stamp`)) as t1
RIGHT JOIN (SELECT date(`Date/Time`) as date, 
	CAST(SUM((`CH2-Main Power` + 
		`CH3-Main Power`) / 60 / 1000) AS DECIMAL(10,2)) AS val, 
	0 as val2 FROM eMonitor GROUP BY date(`Date/Time`)) as t2
ON t1.date=t2.date;";

$result = mysqli_query($con,$sql);
// $row = $result->fetch_row();
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);

mysqli_close($con);
?>