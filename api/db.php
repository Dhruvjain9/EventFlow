<?php

$db_hostname = ;    // Define database hostname
$db_username = ;  // Define database username
$db_password = ;  // Define database password
$db_name = ;    // Define database name

$conn = mysqli_connect($db_hostname,$db_username,$db_password,$db_name);

if($conn-> connect_error){
    echo connection_status;
}
?>