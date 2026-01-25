<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

include "db.php";

$data = $conn->prepare(
    "SELECT booking_id
     FROM bookings
     ORDER BY Booking_date DESC
     LIMIT 1"
//     WHERE user_id = ?
);

//$data->bind_param("s", $user_id);
$data->execute();

$result = $data->get_result();

$BookingID = $result->fetch_assoc();


echo json_encode($BookingID);
