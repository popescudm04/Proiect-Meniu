<?php
include('../../db.php'); // Include your database connection code

header('Content-Type: application/json'); // Set JSON content type header

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET['id'])) {
    $tableId = mysqli_real_escape_string($conn, $_GET['id']);

    // Perform a DELETE query to remove the table with the specified ID
    $query = "DELETE FROM orders WHERE table_id = $tableId";

    if (mysqli_query($conn, $query)) {
        // Table successfully removed
        echo json_encode(array('success' => true, 'message' => 'Table removed successfully.'));
    } else {
        // Error removing table
        echo json_encode(array('success' => false, 'message' => 'Error removing table.'));
        http_response_code(500); // Set 500 Internal Server Error status code
    }

    // Close the database connection
    mysqli_close($conn);
} else {
    // Invalid request method or missing parameters
    http_response_code(400); // Set 400 Bad Request status code
    echo json_encode(array('success' => false, 'message' => 'Invalid request.'));
}
?>
