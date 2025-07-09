<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'gamersupps';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed"]);
    exit;
}

$sql = "SELECT * FROM partners";
$result = $conn->query($sql);

$partners = [];

while ($row = $result->fetch_assoc()) {
    $row['socials'] = json_decode($row['socials'], true);
    $partners[] = $row;
}

echo json_encode($partners);
?>