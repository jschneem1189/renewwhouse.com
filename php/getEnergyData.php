<?php
    // load the config file to determine where to make the db connection
    $myfile = fopen("buildConfig", "r") or die("Unable to open buildConfig file!");
    $debug = fgets($myfile);
    
    fclose($myfile);
    if ($debug == "debug") {
        $addr = '23.229.157.253';
    } else {
        $addr = 'localhost';
    }
    
    $con = mysqli_connect($addr,'reneww','renewwhouse','house_data');
    // Check connection
    if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $link = mysqli_select_db($con,"house_data");
    if (!$link) {
        echo "not connected";
    }

    $sql="SELECT TS, `Main Power Main Panel`, `Main Power Secondary Panel`, `West Solar 1`, `West Solar 2`, `South Solar 1`, `South Solar 2` FROM dailyEnergyPreNov7;";

    $result = mysqli_query($con,$sql);
    // $row = $result->fetch_row();
    $obj = '[';
    while($r = mysqli_fetch_object($result)) {
        $obj .= "{";
        $obj .= '"TS":' . '"' . $r->TS . '",';
        $obj .= '"Main Power Main Panel":' . '"' . $r->{'Main Power Main Panel'} . '",';
        $obj .= '"Main Power Secondary Panel":' . '"' . $r->{'Main Power Secondary Panel'} . '",';
        $obj .= '"West Solar 1":' . '"' . $r->{'West Solar 1'} . '",';
        $obj .= '"West Solar 2":' . '"' . $r->{'West Solar 2'} . '",';
        $obj .= '"South Solar 1":' . '"' . $r->{'South Solar 1'} . '",';
        $obj .= '"South Solar 2":' . '"' . $r->{'South Solar 2'} . '"';
        $obj .= "},";
    }
    // remove the trailing ','
    $obj = substr($obj, 0, -1);
    $obj .= ']';
    print json_decode(json_encode($obj));
    // print json_encode($obj, JSON_FORCE_OBJECT);

    mysqli_close($con);
?>