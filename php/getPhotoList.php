<?php
      $files = scandir($_GET["directory"]);
      print json_encode($files);
?>
