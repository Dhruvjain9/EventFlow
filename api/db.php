<?php

$db_hostname = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "event-flow";

$conn = mysqli_connect($db_hostname,$db_username,$db_password,$db_name);

if($conn-> connect_error){
    echo connection_status;
}
?>