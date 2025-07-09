<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'gamersupps';

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sanitize and get POST data
$name = $conn->real_escape_string($_POST['name']);
$status = $conn->real_escape_string($_POST['status']);
$first_appearance = $conn->real_escape_string($_POST['first_appearance']);
$avatar_url = $conn->real_escape_string($_POST['avatar_url']);
$twitter = $conn->real_escape_string($_POST['twitter']);

// socials stored as JSON string
$socials = json_encode(['twitter' => $twitter]);

$sql = "INSERT INTO partners (name, status, first_appearance, avatar_url, socials) VALUES ('$name', '$status', '$first_appearance', '$avatar_url', '$socials')";

if ($conn->query($sql) === TRUE) {
    echo "New partner added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>