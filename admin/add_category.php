<?php
include('../db.php'); // Include your database connection code

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $categoryName = $_POST['categoryName'];

    // Handle image upload
    $imageData = null;
    if (isset($_FILES['categoryImage']) && $_FILES['categoryImage']['error'] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES['categoryImage']['tmp_name'];
        $imageData = file_get_contents($tmpName);
        $imageData = base64_encode($imageData);
    }

    // Prepare and execute SQL query to insert new category into the database
    $stmt = $conn->prepare("INSERT INTO categories (name, image) VALUES (?, ?)");
    $stmt->bind_param("ss", $categoryName, $imageData);

    if ($stmt->execute()) {
        echo json_encode(array('success' => true, 'message' => 'Category added successfully!'));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Error: ' . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array('success' => false, 'error' => 'Invalid request method'));
}
?>
