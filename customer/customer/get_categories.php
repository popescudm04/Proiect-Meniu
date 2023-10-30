<?php
include('../../db.php'); // Include the database connection file

// Fetch categories from the database
$sql = "SELECT * FROM categories";
$result = $conn->query($sql);
$categories = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      //  $row['image'] = ($row['image']);
        $categories[] = $row;
    }
}

// Return categories as JSON
header('Content-Type: application/json');
echo json_encode($categories);

// Close the database connection
$conn->close();

?>
