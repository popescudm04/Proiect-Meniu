<?php
$servername = "localhost";
$username = "menuapp";
$password = "xD/bV6HwOXpVHZIW";
$database = "restaurant_menu";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
