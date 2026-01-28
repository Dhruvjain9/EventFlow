<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

include "db.php";

$city     = $_GET['city'] ?? null;
$date     = $_GET['date'] ?? null;
$minPrice = $_GET['min_price'] ?? null;
$maxPrice = $_GET['max_price'] ?? null;

$sql = "
    SELECT 
        event_id,
        VENUE,
        CAPACITY,
        DATE,
        img_url,
        ORIGINALCOVER,
        TICKETS_SOLD,
        TICKET_PRICE
    FROM event_data
    WHERE 1=1
";

$params = [];
$types  = "";

/* ✅ FIXED: Multi-city OR logic */
if ($city) {
    $cities = explode(",", $city);
    $placeholders = implode(",", array_fill(0, count($cities), "?"));
    $sql .= " AND VENUE IN ($placeholders)";
    $types .= str_repeat("s", count($cities));
    foreach ($cities as $c) {
        $params[] = $c;
    }
}

if ($date) {
    $sql .= " AND DATE = ?";
    $params[] = $date;
    $types .= "s";
}

if ($minPrice !== null) {
    $sql .= " AND TICKET_PRICE >= ?";
    $params[] = $minPrice;
    $types .= "i";
}

if ($maxPrice !== null) {
    $sql .= " AND TICKET_PRICE <= ?";
    $params[] = $maxPrice;
    $types .= "i";
}

$sql .= " ORDER BY DATE ASC";

$stmt = $conn->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$events = [];
while ($row = $result->fetch_assoc()) {
    $events[] = $row;
}

echo json_encode($events);
