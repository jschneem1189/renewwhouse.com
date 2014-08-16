<?php
// ini_set('memory_limit', '-1');
$con = mysqli_connect('localhost','reneww','renewwhouse','house_data');
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

$sql="SELECT date(`Date/Time`) as date, SUM(`CH1-Inactive` + 
	`CH2-Main Power` + 
	`CH3-Main Power` + 
	`CH4-Oven` + 
	`CH5-Oven` + 
	`CH6-Furnace closet light` + 
	`CH7-Office outlet` + 
	`CH8-Basement outlets and lights` + 
	`CH9-Office outlet{1}` + 
	`CH10-Dining Room outlets` + 
	`CH11-Basement closet light` + 
	`CH12-Basement lights` + 
	`CH13-Living Room outlet` + 
	`CH14-Air Conditioner` + 
	`CH15-Air Conditioner` + 
	`CH16-Basement outlet` + 
	`CH17-Basement lights{1}` + 
	`CH18-First Floor lights and outlets` + 
	`CH19-Kitchen outlet` + 
	`CH20-clothes dryer` + 
	`CH21-clothes dryer` + 
	`CH22-Second Floor lights and outlets` + 
	`CH23-S bedroom outlet` + 
	`CH24-First floor outlets and lights` + 
	`CH25-East bedroom outlets` + 
	`CH26-Second Floor outlets` + 
	`CH27-Refrigerator` + 
	`CH28-Inactive` + 
	`CH29-Inactive` + 
	`CH30-Inactive` + 
	`CH31-Inactive` + 
	`CH32-Inactive` + 
	`CH33-Inactive` + 
	`CH34-Inactive` + 
	`CH35-Inactive` + 
	`CH36-Inactive` + 
	`CH37-Inactive` + 
	`CH38-Inactive` + 
	`CH39-Inactive` + 
	`CH40-Inactive` + 
	`CH41-Inactive` + 
	`CH42-Inactive` + 
	`CH43-Inactive` + 
	`CH44-Inactive` + 
	`CH45-Inactive`) AS val, 
	SUM(`CH1-Inactive` + 
	`CH2-Main Power` + 
	`CH3-Main Power` + 
	`CH4-Oven` + 
	`CH5-Oven` + 
	`CH6-Furnace closet light` + 
	`CH7-Office outlet` + 
	`CH8-Basement outlets and lights` + 
	`CH9-Office outlet{1}` + 
	`CH10-Dining Room outlets` + 
	`CH11-Basement closet light` + 
	`CH12-Basement lights` + 
	`CH13-Living Room outlet` + 
	`CH14-Air Conditioner` + 
	`CH15-Air Conditioner` + 
	`CH16-Basement outlet` + 
	`CH17-Basement lights{1}` + 
	`CH18-First Floor lights and outlets` + 
	`CH19-Kitchen outlet` + 
	`CH20-clothes dryer` + 
	`CH21-clothes dryer` + 
	`CH22-Second Floor lights and outlets` + 
	`CH23-S bedroom outlet` + 
	`CH24-First floor outlets and lights` + 
	`CH25-East bedroom outlets` + 
	`CH26-Second Floor outlets` + 
	`CH27-Refrigerator` + 
	`CH28-Inactive` + 
	`CH29-Inactive` + 
	`CH30-Inactive` + 
	`CH31-Inactive` + 
	`CH32-Inactive` + 
	`CH33-Inactive` + 
	`CH34-Inactive` + 
	`CH35-Inactive` + 
	`CH36-Inactive` + 
	`CH37-Inactive` + 
	`CH38-Inactive` + 
	`CH39-Inactive` + 
	`CH40-Inactive` + 
	`CH41-Inactive` + 
	`CH42-Inactive` + 
	`CH43-Inactive` + 
	`CH44-Inactive` + 
	`CH45-Inactive`) * 0.5 AS val2 FROM eMonitor GROUP BY date(`Date/Time`)";

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