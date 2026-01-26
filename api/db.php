<?php
// Define your database details here.

$db_hostname = "";
$db_username = "";
$db_password = "";
$db_name = "";

$conn = mysqli_connect($db_hostname,$db_username,$db_password,$db_name);

if($conn-> connect_error){
    echo connection_status;
}
?>