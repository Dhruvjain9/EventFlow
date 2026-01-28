<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/* Handle preflight */
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

/* Allow POST only for logic */
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

include "db.php";


/* Read JSON body */
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

/*$name         = $data["name"]*/
$user_id      = $data["user_id"];
$event_id     = $data["event_id"] ?? null;
$email        = trim($data["email"] ?? null);

$tickets_sold = $data["tickets"] ?? 1;

/* Validate */
if (!$event_id || !$email || !$tickets_sold || !$user_id) {
    http_response_code(400);

    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

/* Check event exists */
$check = $conn->prepare(
    "SELECT event_id FROM event_data WHERE event_id = ?"
);
$check->bind_param("i", $event_id);
$check->execute();
$check->store_result();

if ($check->num_rows === 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid event"]);
    exit;
}

$booking_date = date("Y-m-d");

/* Insert booking */
$stmt = $conn->prepare(
    "INSERT INTO bookings (user_id, event_id, email, Tickets_sold, Booking_date)
     VALUES (?, ?, ?, ?, ?)"
);

$eventUpdate = $conn->prepare(
    "UPDATE event_data SET TICKETS_SOLD = TICKETS_SOLD + ? WHERE event_id = ?"
);

$eventUpdate->bind_param("ii",$tickets_sold, $event_id);

$stmt->bind_param(
    "iisis",
    $user_id,
    $event_id,
    $email,
    $tickets_sold,
    $booking_date
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "booking_id" => $stmt->insert_id
    ]);
    $eventUpdate->execute();
} else {
    http_response_code(500);
    echo json_encode(["error" => "Booking failed"]);
}
