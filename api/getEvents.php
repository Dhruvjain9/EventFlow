<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

include "db.php";

$city = $_GET['city'] ?? null;

if (!$city) {
    http_response_code(400);
    echo json_encode(["error" => "City is required"]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT event_id, date
     FROM event_data
     WHERE venue = ?
     ORDER BY date ASC"
);

$stmt->bind_param("s", $city);
$stmt->execute();

$result = $stmt->get_result();

$events = [];

while ($row = $result->fetch_assoc()) {
    $events[] = [
        "event_id" => $row["event_id"],
        "date"     => $row["date"]
    ];
}

echo json_encode($events);
