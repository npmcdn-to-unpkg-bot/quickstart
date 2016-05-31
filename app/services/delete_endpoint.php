<?php

/*
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  print("This is a POST<br>");
} else {
  print("This is NOT a POST<br>");
}
*/


if (isset($_GET['drivername'])) {
  $drivername = isset($_GET['drivername']) ? urldecode($_GET['drivername']) : '';
  //print("<p>line ".__LINE__." delete_endpoint.php sees \$_GET['drivername'] as |".$drivername."|</p>");
} else {
  if (isset($_POST['drivername'])) {
    $drivername = isset($_POST['drivername']) ? urldecode($_POST['drivername']) : '';
    //print("<p>line ".__LINE__." delete_endpoint.php sees \$_POST['drivername'] as |".$drivername."|</p>");


    //print("<p>line ".__LINE__." This is a var_dump(\$_POST)</p>");
    //var_dump($_POST);


    // list all the $_POST variables that were passed in from the caller
    $post_list = "<p>".__LINE__.
    " This is the \$_POST list decoded</p>";

    foreach($_POST as $key => $val) {
      $post_list .= $key."=".urldecode($val) . "<br>";
    }
    //print("$post_list");
    //var_dump($_POST['drivername']);

  } else {

    // Try this: When used in conjunction with a REST call it is proper to
    // use a form w method='POST' request.
    $rest_vars = file_get_contents("php://input");

    if ($rest_vars) {

      //print("<p>line ".__LINE__." delete_endpoint.php sees  \$rest_vars</p>");
      //print("<p>line ".__LINE__." Now looking at php://input: \$rest_vars and see the string $rest_vars</p>");

      //print("<p>line ".__LINE__." This is a var_dump(\$rest_vars)</p>");
      //var_dump($rest_vars);

      $decoded_json = json_decode($rest_vars);

      //print("<p>line ".__LINE__." this is a var_dump(\$decoded_json)</p>");
      //var_dump($decoded_json);
      if ($decoded_json) {
        $drivername = $decoded_json -> {'drivername'};
        //print("<p>line ".__LINE__." from json_decode() \$drivername $drivername</p>");
      }
    }
  }
}
/*

  to unit test a post request curl is a great utility

 cd \wamp\www\ng_demo\app\delete

 C:\wamp\www\ng2_demo\app\delete>curl -X POST -F 'drivername=unique' -F 'password=secret' localhost/app/services/delete_endpoint.php
 */




if (isset($drivername) == false) {
  http_response_code(403);
  exit("Exiting delete_endpoint.php because the drivername was not received.");
}



/*
 * delete_driver.php takes input from the uri or a $_POST for fields to delete a row
 * from the existing 'driver' table
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
 * Here we create a SQL DELETE statement from the data received when this script began.
 * Next, we try to run it against the open database.
 */
function deleteExistingDriver($db, $drivername) {
  // first we must urldecode what was urlencoded
  $drivername = urldecode($drivername);


  $sql = "DELETE FROM DRIVER WHERE DRIVERNAME = '" . $drivername . "'";

  //print("<p>line ".__LINE__." \$sql statement:<br>$sql</p>");

  $ret = $db->exec($sql);
  if(!$ret){
    $ret = $db->lastErrorMsg();
    print("<p>ERROR: $ret</p>");
    if ($ret == "UNIQUE constraint failed: driver.DRIVERNAME") {
      $ret = "duplicate drivername '" . $drivername . "'";
    }
  } else {
    //print("<p>A row was successfully deleted from the 'driver' table</p>");
    $ret = "deleted";
  }

  return($ret);
}

verifyDatabaseIsOpen($db);

$ret = deleteExistingDriver($db, urlencode($drivername));

// close the database
$db->close();

// include a Status Code in the http reply header
//print("<p>SQLite DELETE returned message: $ret</p>");


// Note that if any of the debug messages are uncommented and print then the http_response_code doesn't work
if ($ret == "deleted") {
  http_response_code(200);
  exit($ret);
} else {
  http_response_code(404);
  exit($ret);
}

?>