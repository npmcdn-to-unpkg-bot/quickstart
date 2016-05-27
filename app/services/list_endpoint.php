<?php
include('include.php');


$db = new SQLite3('./driver.db');

if(!$db){
  $str = sprint("$db->lastErrorMsg()");
  print($str);
  $my_return = false;
  http_response_code(401);
  logIt(  sprintf(  "(line __LINE__) Error:%s found row %s", $db->lastErrorMsg()  )  );
} else {
  $query = sprintf("SELECT * from driver");
  // execute query
  $result = $db->query($query);

  // go to start of the returned array
  $result->reset();
  $return_list = [];
  $driverDBrow = '';

  $row_count = 0;

  while ($returned_row = $result->fetchArray()) {
    $drivername = $returned_row[0];
    $password    =  $returned_row[1];
    $ability    = $returned_row[2];
    $firstname  = $returned_row[3];
    $lastname    = $returned_row[4];
    $email      = $returned_row[5];
    $address    = $returned_row[6];
    $city        = $returned_row[7];
    $state      = $returned_row[8];
    $zip        = $returned_row[9];
    $phone      = $returned_row[10];


    $driver_row = array(
      "drivername"  => "$returned_row[0]",
      "password"    => "$returned_row[1]",
      "ability"      => "$returned_row[2]",
      "firstname"    => "$returned_row[3]",
      "lastname"    => "$returned_row[4]",
      "email"        => "$returned_row[5]",
      "address"      => "$returned_row[6]",
      "city"        => "$returned_row[7]",
      "state"        => "$returned_row[8]",
      "zip"          => "$returned_row[9]",
      "phone"        => "$returned_row[10]",
      "selected"    => false
    );

    $return_list[$row_count] = $driver_row;

    $row_count++;
    //logIt(sprintf("(line %s) found returned_row %s",  __LINE__, $driverDBrow));
  }






  //logIt(  sprintf(  "(line %s) \$row_count: %s", __LINE__, $row_count  )  );
  $my_return = true;
  /*
  if ($row_count > 0) {
    logIt(sprintf("(line %s) passed username/password check", __LINE__));
    $my_return = true;
  } else {
    logIt(sprintf("(line %s) failed username/password check", __LINE__));
    $my_return = false;
  }
  */
  $db->close();

  // return the appropriate status code along with a either the json encoded list or "invalid"
  // 401 – Unauthorized

  if ($my_return) {
    http_response_code(200);
    exit(json_encode($return_list));
  } else {
    http_response_code(401);
    exit('invalid');
  }
}

exit();
?>
