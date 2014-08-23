<?php
// header('Access-Control-Allow-Origin: *');
// ini_set('memory_limit', '-1');
$con = mysqli_connect('23.229.157.253','reneww','renewwhouse','house_data');
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$link = mysqli_select_db($con,"house_data");
if (!$link) {
	echo "not connected";
}

$labels = array();
$values = array();

$sql="SELECT date(`Date/Time`) as date, 
	CAST(SUM((`CH2-Main Power` + 
		`CH3-Main Power`) / 60 / 1000) AS DECIMAL(10,2)) AS val, 
	CAST(SUM((`CH2-Main Power` + 
		`CH3-Main Power`) * 0.5 / 60 / 1000) AS DECIMAL(10,2)) AS val2 FROM eMonitor GROUP BY date(`Date/Time`)";

$result = mysqli_query($con,$sql);
// $row = $result->fetch_row();
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
	
// echo "{\"labels\":";
// echo json_encode($labels);
// echo ",\"values\":";
// echo json_encode($values);
// echo "}";


mysqli_close($con);
?>