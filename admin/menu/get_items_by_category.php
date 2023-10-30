<?php
include('../../db.php'); // Include your database connection code

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['category_id'])) {
    // Get the category ID from the query parameter
    $categoryId = mysqli_real_escape_string($conn, $_GET['category_id']);

    // Fetch items for the specified category from the database
    $sql = "SELECT * FROM menu WHERE category_id = $categoryId";
    $result = $conn->query($sql);

    // Check if there are items for the category
    if ($result->num_rows > 0) {
        $items = array();

        // Fetch items and add them to the response array
        while($row = $result->fetch_assoc()) {
            // Decode the base64 image data if it's stored as base64 in the database
            // You may not need this step if the image is stored as plain base64 strings
            // $row['image'] = base64_decode($row['image']);

            // Add item details to the response array
            $items[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description'],
                'price' => $row['price'],
                'image' => $row['image'] // Assuming 'image' column contains base64-encoded image data
            );
        }

        // Return items as JSON response
        header('Content-Type: application/json');
        echo json_encode($items);
    } else {
        // No items found for the category
        header('Content-Type: application/json');
        echo json_encode(array());
    }
} else {
    // Invalid request method or missing category ID parameter
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid request";
}

// Close the database connection
$conn->close();
?>
