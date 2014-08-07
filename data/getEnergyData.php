<?php
// header("Access-Control-Allow-Origin : *");
$cur_year = intval($_GET['cur_year']);
$year = intval($_GET['year']);
$month = intval($_GET['month']);
$day = intval($_GET['day']);
$this_year = "2013";

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
// SHOW ALL YEARS
if ($year === 0) {
	while($this_year <= $cur_year) {
		//$sql="SELECT Basement FROM tempdata WHERE id = '".$q."'";
		$sql="SELECT SUM(`CH1-Inactive`) + 
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
			SUM(`CH45-Inactive`) AS '".$this_year."' FROM eMonitor 
			WHERE `Date/Time` >= '".$this_year."-01-01'
			AND `Date/Time` <= '".$this_year."-12-31'";

		$result = mysqli_query($con,$sql);
		$row = $result->fetch_row();
		array_push($labels, $this_year);
		array_push($values, $row[0]);
	  	$this_year++;
	}
} else if ($month === 0) {
	$sql="SELECT SUM(`CH1-Inactive`) + 
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
			SUM(`CH45-Inactive`) AS 'Jan' FROM eMonitor 
			WHERE `Date/Time` >= '".$year."-01-01'
			AND `Date/Time` <= '".$year."-01-31'";

		$result = mysqli_query($con,$sql);
		$row = $result->fetch_row();
}
echo "{\"labels\":";
echo json_encode($labels);
echo ",\"values\":";
echo json_encode($values);
echo "}";


mysqli_close($con);
?>