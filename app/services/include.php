<?php
/*
 * include.php contains some functions common the the endpoints
 * On server, PHP Version 5.5.22
 */
// hide obnoxious error messages from user
//error_reporting(E_ERROR);

// We can easily unit test this endpoint code with a variable appended to the URI.
if (isset($_GET['drivername']) == true) {
  $drivername =    $_GET['drivername'];
  $password =      $_GET['password'];
  if (isset($_GET['ability']) == true) {
    $ability = $_GET['ability'];
    $firstname = $_GET['firstname'];
    $lastname = $_GET['lastname'];
    $email = $_GET['email'];
    $address = $_GET['address'];
    $city = $_GET['city'];
    $state = $_GET['state'];
    $zip = $_GET['zip'];
    $phone = $_GET['phone'];
  }
} else {
  // When used in conjunction with a REST call it is proper to use a POST request.
  /*
  $rest_json_object = file_get_contents("php://input");

  $rest_variables = json_decode($rest_json_object);
  */
  if (isset($_POST['drivername']) == true) {
    $drivername = $_POST['drivername'];

    if (isset($_POST['password']) == true) {
      $password = $_POST['password'];
    } else {
      $password='';
    }

    if (isset($_POST['ability']) == true) {
    $ability = $_POST['ability'];
    } else {
      $ability = '';
    }

    if (isset($_POST['firstname']) == true) {
      $firstname = $_POST['firstname'];
    } else {
      $firstname = '';
    }

    if (isset($_POST['lastname']) == true) {
      $lastname = $_POST['lastname'];
    } else {
      $lastname = '';
    }

    if (isset($_POST['email']) == true) {
      $email = $_POST['email'];
    }

    if (isset($_POST['address']) == true) {
      $address = $_POST['address'];
    } else {
      $address = '';
    }

    if (isset($_POST['city']) == true) {
      $city = $_POST['city'];
    } else {
      $city = '';
    }

    if (isset($_POST['state']) == true) {
      $state = $_POST['state'];
    } else {
      $state = '';
    }

    if (isset($_POST['zip']) == true) {
      $zip = $_POST['zip'];
    } else {
      $zip = '';
    }

    if (isset($_POST['phone']) == true) {
      $phone = $_POST['phone'];
    } else {
      $phone = '';
    }
  }
}


/*
 * logIt($msg) sends $msg to the console.log
 */
function logIt($msg){
  print("<script>console.log('$msg')</script>\n");
}
?>