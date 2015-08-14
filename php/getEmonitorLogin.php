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