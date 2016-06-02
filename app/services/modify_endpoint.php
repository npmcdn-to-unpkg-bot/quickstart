<?php

/*
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  print("This is a POST<br>");
} else {
  print("This is NOT a POST<br>");
}
*/
// check to see if variables were received via the \$_POST global variable
if (isset($_POST['drivername'])) {
  $drivername = isset($_POST['drivername']) ? urldecode($_POST['drivername']) : '';
  //print("<p>line ".__LINE__." add_endpoint.php sees \$_POST['drivername'] as |".$drivername."|</p>");


  //print("<p>line ".__LINE__." This is a var_dump(\$_POST)</p>");
  //var_dump($_POST);


  // list all the $_POST variables that were passed in from the caller
  $post_list = "<p>".__LINE__." This is the \$_POST variable list decoded</p>";

  foreach($_POST as $key => $val) {
    $post_list .= $key . "=".urldecode($val) . "<br>";
  }
  //print("$post_list");
  //var_dump($_POST['drivername']);

  $password    = isset($_POST['password'])   ? $_POST['password']   : '';
  $ability     = isset($_POST['ability'])    ? $_POST['ability']    : '';
  $firstname   = isset($_POST['firstname'])  ? $_POST['firstname']  : '';
  $lastname    = isset($_POST['lastname'])   ? $_POST['lastname']   : '';
  $email       = isset($_POST['email'])      ? $_POST['email']      : '';
  $address     = isset($_POST['address'])    ? $_POST['address']    : '';
  $city        = isset($_POST['city'])       ? $_POST['city']       : '';
  $ability     = isset($_POST['ability'])    ? $_POST['ability']    : '';
  $state       = isset($_POST['state'])      ? $_POST['state']      : '';
  $zip         = isset($_POST['zip'])        ? $_POST['zip']        : '';
  $phone       = isset($_POST['phone'])      ? $_POST['phone']      : '';
} else {

  // Try this: When used in conjunction with a REST call it is proper to
  // use a form w method='POST' request.
  $rest_vars = file_get_contents("php://input");

  if ($rest_vars) {

    //print("<p>line ".__LINE__." add_endpoint.php sees  \$rest_vars</p>");
    //print("<p>line ".__LINE__." Now looking at php://input: \$rest_vars and see the string $rest_vars</p>");

    //print("<p>line ".__LINE__." This is a var_dump(\$rest_vars)</p>");
    //var_dump($rest_vars);

    $decoded_json = json_decode($rest_vars);

    //print("<p>line ".__LINE__." this is a var_dump(\$decoded_json)</p>");
    //var_dump($decoded_json);
    if ($decoded_json) {
      $drivername = $decoded_json->{'drivername'};
      $password   = $decoded_json->{'password'};
      $ability    = $decoded_json->{'ability'};
      $firstname  = $decoded_json->{'firstname'};
      $lastname   = $decoded_json->{'lastname'};
      $email      = $decoded_json->{'email'};
      $address    = $decoded_json->{'address'};
      $city       = $decoded_json->{'city'};
      $state      = $decoded_json->{'state'};
      $zip        = $decoded_json->{'zip'};
      $phone      = $decoded_json->{'phone'};

      //print("<p>line ".__LINE__." from json_decode() \$drivername $drivername</p>");
      //print("<p>line ".__LINE__." from json_decode() \$password    $password</p>");
      //print("<p>line ".__LINE__." from json_decode() \$ability    $ability</p>");
      //print("<p>line ".__LINE__." from json_decode() \$firstname  $firstname</p>");
      //print("<p>line ".__LINE__." from json_decode() \$lastname    $lastname</p>");
      //print("<p>line ".__LINE__." from json_decode() \$email      $email</p>");
      //print("<p>line ".__LINE__." from json_decode() \$address    $address</p>");
      //print("<p>line ".__LINE__." from json_decode() \$city        $city</p>");
      //print("<p>line ".__LINE__." from json_decode() \$zip        $zip</p>");
      //print("<p>line ".__LINE__." from json_decode() \$phone      $phone</p>");
    }
  }
}
/*

  to unit test a post request curl is a great utility

 cd \wamp\www\ng_demo\app\add

 C:\wamp\www\ng2_demo\app\add>curl -X POST -F 'drivername=unique' -F 'password=secret' localhost/app/add/add_endpoint.php
 */




if (isset($drivername) == false) {
  http_response_code(404);
  exit("Exiting add_endpoint.php because the drivername was not received.");
}



/*
 * add_driver.php takes input from the uri or a $_POST for fields to create a new  row
 * in the existing 'driver' table
 */


/*
 * A constructor is a function that is executed after the object (in this case, the class) has been
 * initialized (its memory allocated, instance properties copied etc.). Its purpose is to put the
 * object in a valid state.
 */
class MyDB extends SQLite3 {
  function __construct() {
    $this->open('./driver.db');
  }
}

/*
 * this statement actually open an existing by way of using the "new" keyword because
 * it is creating a new instance of the MyDB class. The construct function is called
 * once the MyDB class is instantiated, which opens an existing database or created one
 * if it doesn't exist.
 */

$db = new MyDB();

/*
 * verifyDatabaseIsOpen works with a sqlite database, which allows a
 */

function verifyDatabaseIsOpen($db){
  if (!$db) {
    echo $db->lastErrorMsg();
  }
}


/*
 * Here we create a SQL INSERT statement from the data received when this script began.
 * Next, we try to run it against the open database.
 */
function updateDriver($db, $drivername, $password, $ability,
                      $firstname, $lastname, $email, $address, $city, $state, $zip, $phone) {
  // first we must urldecode what was urlencoded
  $drivername = urldecode($drivername);
  $password = urldecode($password);
  $ability = urldecode($ability);
  $firstname = urldecode($firstname);
  $lastname = urldecode($lastname);
  $email = urldecode($email);
  $address = urldecode($address);
  $city = urldecode($city);
  $state = urldecode($state);
  $zip = urldecode($zip);
  $phone = urldecode($phone);


  $sql  = "UPDATE DRIVER SET";
  $sql .= " DRIVERNAME = '" . $drivername . "',";
  $sql .= " PASSWORD = '" . $password . "',";
  $sql .= " ABILITY = '" . $ability . "',";
  $sql .= " FIRSTNAME = '" . $firstname . "',";
  $sql .= " LASTNAME = '" . $lastname . "',";
  $sql .= " EMAIL = '" . $email . "',";
  $sql .= " ADDRESS  = '" . $address . "',";
  $sql .= " CITY = '" . $city . "',";
  $sql .= " STATE = '" . $state . "',";
  $sql .= " ZIP = '" . $zip . "',";
  $sql .= " PHONE = '" . $phone . "'";
  $sql .= " WHERE DRIVERNAME = '$drivername'";
   //print("<p>line ".__LINE__." \$sql statement:<br>$sql</p>");

  $ret = $db->exec($sql);
  if(!$ret){
    $ret = $db->lastErrorMsg();
    //print("<p>ERROR: $ret</p>");
    if ($ret == "UNIQUE constraint failed: driver.DRIVERNAME") {
      $ret = "duplicate drivername '" . $drivername . "'";
    }
  } else {
    //print("<p>A row was successfully added to the 'driver' table</p>");
    $ret = "updated";
  }

  return($ret);
}

verifyDatabaseIsOpen($db);

$ret = updateDriver($db, urlencode($drivername), urlencode($password), urlencode($ability),
  urlencode($firstname), urlencode($lastname), urlencode($email), urlencode($address),
  urlencode($city), urlencode($state), urlencode($zip), urlencode($phone));

// close the database
$db->close();

// include a Status Code in the http reply header
//print("<p>SQLite UPDATE returned message: $ret</p>");


// Note that if any of the debug messages are uncommented and print then the http_response_code doesn't work
if ($ret == "updated") {
  http_response_code(200);
  exit($ret);
} else {
  http_response_code(404);
  exit($ret);
}

?>