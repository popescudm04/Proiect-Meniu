<?php
include('../../db.php');

// Prepare and execute SQL query to fetch orders data
$query = "SELECT table_id, order_column FROM orders ORDER BY table_id ASC";
$result = $conn->query($query);

if ($result) {
    // Fetch results and store in an array
    $orders = array();
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    // Return orders data as JSON
    header('Content-Type: application/json');
    echo json_encode($orders);
} else {
    // Error occurred while fetching data
    http_response_code(500);
    echo json_encode(array("message" => "Failed to fetch orders data."));
}

// Close the database connection
$conn->close();
?>