<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

/* Handle CORS preflight */
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method not allowed"
    ]);
    exit;
}

include "db.php";

/* Read JSON */
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Invalid JSON"
    ]);
    exit;
}

$mode     = $data["mode"] ?? null;
$email    = trim($data["email"] ?? "");
$password = $data["password"] ?? "";
$name     = trim($data["name"] ?? "");
$age      = $data["Age"] ?? 0;
$location = $data["Location"] ?? "";

/* Basic validation */
if (!$mode || !$email || !$password) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Missing fields"
    ]);
    exit;
}

/* ===================== SIGN UP ===================== */
if ($mode === "signup") {

    if (!$name) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "Name required"
        ]);
        exit;
    }

    /* Check if email exists */
    $check = $conn->prepare(
        "SELECT User_ID FROM users WHERE email = ?"
    );
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "Email already exists"
        ]);
        exit;
    }

    /* Insert user (plain password) */
    $stmt = $conn->prepare(
        "INSERT INTO users (Name, email, Location, Age, Password, Role, Last_login)
         VALUES (?, ?, ?, ?, ?, 'user', NOW())"
    );
    $stmt->bind_param("sssis", $name, $email, $password, $location, $age);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Signup failed"
        ]);
        exit;
    }

    $userId = $stmt->insert_id;
}

/* ===================== SIGN IN ===================== */
else if ($mode === "signin") {

    $stmt = $conn->prepare(
        "SELECT *
         FROM users
         WHERE email = ?"
    );
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "error" => "Invalid credentials"
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    /* Plain password comparison */
    if ($password !== $user["Password"]) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "error" => "Invalid credentials"
        ]);
        exit;
    }

    /* Update last login */
    $update = $conn->prepare(
        "UPDATE users SET Last_login = NOW() WHERE User_ID = ?"
    );
    $update->bind_param("i", $user["User_ID"]);
    $update->execute();

    $userId = $user["User_ID"];
    $name   = $user["Name"];
    $age    = $user["Age"];
}

/* ===================== INVALID MODE ===================== */
else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Invalid mode"
    ]);
    exit;
}

/* ===================== TOKEN (DEV TOKEN) ===================== */
$payload = base64_encode(json_encode([
    "id" => $userId,
    "email" => $email,
    "exp" => time() + 86400
]));

$token = hash_hmac("sha256", $payload, "DEV_SECRET_KEY");

/* ===================== RESPONSE ===================== */
echo json_encode([
    "success" => true,
    "user" => [
        "id" => $userId,
        "email" => $email,
        "name" => $name,
        "age" => $age
    ],
    "token" => $token
]);
