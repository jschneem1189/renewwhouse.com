<?php
// header("Access-Control-Allow-Origin : *");
$q = intval($_GET['q']);

$con = mysqli_connect('localhost','root','','house_data');
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$link = mysqli_select_db($con,"house_data");
if (!$link) {
	echo "not connected";
}
$sql="SELECT Basement FROM tempdata WHERE id = '".$q."'";
$result = mysqli_query($con,$sql);

// while($row = mysqli_fetch_array($result)) {
//   echo "<tr>";
//   echo "<td>" . $row['FirstName'] . "</td>";
//   echo "<td>" . $row['LastName'] . "</td>";
//   echo "<td>" . $row['Age'] . "</td>";
//   echo "<td>" . $row['Hometown'] . "</td>";
//   echo "<td>" . $row['Job'] . "</td>";
//   echo "</tr>";
// }

$row = $result->fetch_row();
echo "result: " . $row[0];

mysqli_close($con);
?>