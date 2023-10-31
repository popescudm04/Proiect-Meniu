<?php
// Include the database connection file
include('../../db.php');

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the search keyword from the request
$searchKeyword = $_GET['keyword'];

// Define an empty array to store the search results
$searchResults = [];

// Write your SQL query to search for menu items based on the keyword
$query = "SELECT * FROM menu WHERE name LIKE '%$searchKeyword%'";
$result = $conn->query($query);

if ($result === false) {
    die("Error executing the query: " . $conn->error);
}

while ($row = $result->fetch_assoc()) {
    $searchResults[] = $row;
}

// Encode the search results as JSON and return them
header('Content-Type: application/json');
echo json_encode($searchResults);

$conn->close();
?>
