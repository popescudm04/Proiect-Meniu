<?php
include('../../db.php');

// Get the JSON data from the request
$order_data = file_get_contents('php://input');
$table_id = $_GET['table_id']; // Assuming you are passing table_id through the URL

// Prepare the SQL statement to update the order_column for the specific table_id
$update_query = "UPDATE orders SET order_column = ? WHERE table_id = ?";
$stmt = $conn->prepare($update_query);

// Check if the statement is prepared successfully
if ($stmt) {
    // Bind the JSON data and table_id to the prepared statement parameters
    $stmt->bind_param("si", $order_data, $table_id);

    // Execute the query to update the order_column in the database
    if ($stmt->execute()) {
        // Order successfully placed
        echo json_encode(array("message" => "Order placed successfully."));
    } else {
        // Error occurred while updating the order_column
        http_response_code(500);
        echo json_encode(array("message" => "Failed to place the order."));
    }

    // Close the statement
    $stmt->close();
} else {
    // Error occurred while preparing the statement
    http_response_code(500);
    echo json_encode(array("message" => "Failed to prepare the statement."));
}

// Close the database connection
$conn->close();
?>
