<?php
include('../../db.php'); // Include your database connection code

header('Content-Type: application/json'); // Set JSON content type header

// Fetch table_id from the orders table
$query = "SELECT table_id FROM orders ORDER BY table_id ASC";
$result = mysqli_query($conn, $query);

$tables = array(); // Initialize an array to store table IDs

if ($result) {
    // Fetch data from the result set and add it to the tables array
    while ($row = mysqli_fetch_assoc($result)) {
        $tables[] = $row['table_id'];
    }

    // Return the tables array as JSON
    echo json_encode($tables);
} else {
    // Error fetching data
    http_response_code(500); // Set 500 Internal Server Error status code
    echo json_encode(array('error' => 'Error fetching table IDs.'));
}

// Close the database connection
mysqli_close($conn);
?>
