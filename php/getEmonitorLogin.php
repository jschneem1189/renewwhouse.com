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

$sql="SELECT login, password FROM house_data.credentials WHERE service='emonitor';";

$result = mysqli_query($con,$sql);
// $row = $result->fetch_row();
$obj = '{';
$r = mysqli_fetch_object($result);
$obj .= '"login":"' . $r->login . '",';
$obj .= '"password":"' . $r->password . '"';
$obj .= '}';
print json_decode(json_encode($obj));
// print json_encode($obj, JSON_FORCE_OBJECT);

mysqli_close($con);
?>