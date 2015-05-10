<?php
// header('Access-Control-Allow-Origin: *');
// ini_set('memory_limit', '-1');
// $con = mysqli_connect('localhost','root',null,'house_data');
// $con = mysqli_connect('localhost','reneww','renewwhouse','house_data');		// live site
$con = mysqli_connect('23.229.157.253','reneww','renewwhouse','house_data'); // local testing
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$link = mysqli_select_db($con,"house_data");
if (!$link) {
	echo "not connected";
}

$sql="SELECT date(`Time Stamp`) as date, 
  CAST(AVG((`Gas_Furn` + 
    `Gas_WH`)) AS DECIMAL(10,2))*24*0.3 AS gas_val FROM tempdata GROUP BY date(`Time Stamp`)";

$result = mysqli_query($con,$sql);
// $row = $result->fetch_row();
$obj = '{';
while($r = mysqli_fetch_object($result)) {
    $obj .= '"' . $r->date . '"' . ':' . '"' . $r->gas_val . '",';
}
// remove the trailing ','
$obj = substr($obj, 0, -1);
$obj .= '}';
print json_decode(json_encode($obj));
// print json_encode($obj, JSON_FORCE_OBJECT);

mysqli_close($con);
?>