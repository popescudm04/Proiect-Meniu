<?php
include('../../db.php'); // Include your database connection code

header('Content-Type: application/json'); // Set JSON content type header

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['tableNumber'])) {
    // Get table number from the POST request
    $tableNumber = mysqli_real_escape_string($conn, $_POST['tableNumber']);

    // Insert the new table into the orders table
    $stmt = $conn->prepare("INSERT INTO orders (table_id, order_column) VALUES (?, '[]')");
    $stmt->bind_param("i", $tableNumber);

    $response = array(); // Initialize response array

    if ($stmt->execute()) {
        // Table added successfully
        $response['success'] = true;
        $response['message'] = "Table added successfully.";
    } else {
        // Error adding table
        $response['success'] = false;
        $response['message'] = "Error adding table.";
        http_response_code(500); // Set 500 Internal Server Error status code
    }

    $stmt->close();
    $conn->close();

    // Send JSON response
    echo json_encode($response);
} else {
    // Invalid request method or missing parameters
    http_response_code(400); // Set 400 Bad Request status code
    echo json_encode(array('success' => false, 'message' => 'Invalid request.'));
}
?>
