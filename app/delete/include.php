<?php
/*
 * include.php contains some functions common the the endpoints
 * On server, PHP Version 5.5.22
 */
// hide error messages from user
//error_reporting(E_ERROR);


/*
 * logIt($msg) sends $msg to the console.log
 */
function logIt($msg){
  print("<script>console.log('$msg')</script>\n");
}
?>