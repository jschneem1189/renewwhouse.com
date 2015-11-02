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

    $sql="SELECT TS, City_Main_vol, Rainwater_Main_vol, Rainwater_Cistern_water, PGW_Supply_vol FROM dailytotals;";

    $result = mysqli_query($con,$sql);
    // $row = $result->fetch_row();
    $obj = '[';
    while($r = mysqli_fetch_object($result)) {
        $obj .= "{";
        $obj .= '"TS":' . '"' . $r->TS . '",';
        $obj .= '"City_Main_vol":' . '"' . $r->City_Main_vol . '",';
        $obj .= '"Rainwater_Main_vol":' . '"' . $r->Rainwater_Main_vol . '",';
        $obj .= '"Rainwater_Cistern_water":' . '"' . $r->Rainwater_Cistern_water . '",';
        $obj .= '"PGW_Supply_vol":' . '"' . $r->PGW_Supply_vol . '"';
        $obj .= "},";
    }
    // remove the trailing ','
    $obj = substr($obj, 0, -1);
    $obj .= ']';
    print json_decode(json_encode($obj));
    // print json_encode($obj, JSON_FORCE_OBJECT);

    mysqli_close($con);
?>