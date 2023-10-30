<?php
include('../../db.php'); // Include your database connection code

// Fetch categories from the database
$sql = "SELECT id, name, image FROM categories"; // Include the 'image' field in the SQL query
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $categories = array();
    while ($row = $result->fetch_assoc()) {
        // Create an associative array for each category
        $category = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'image' => ($row['image']) // Encode the image field
        );
        
        // Add the category array to the main categories array
        $categories[] = $category;
    }

    // Send the categories as a JSON response
    header('Content-Type: application/json');
    echo json_encode($categories);
} else {
    // If no categories are found, return an empty array as JSON
    header('Content-Type: application/json');
    echo json_encode(array());
}

// Close the database connection
$conn->close();
?>
