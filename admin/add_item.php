<?php
include('../db.php'); // Include your database connection code

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $itemName = $_POST['itemName'];
    $itemDescription = $_POST['itemDescription'];
    $itemPrice = $_POST['itemPrice'];
    $categoryId = $_POST['categoryId']; // Retrieve selected category ID from the form data
    
    // Check if an image was uploaded
    if(isset($_FILES['itemImage']) && $_FILES['itemImage']['error'] === UPLOAD_ERR_OK) {
        // Handle uploaded image
        $imageData = file_get_contents($_FILES['itemImage']['tmp_name']);
        $imageData = base64_encode($imageData);
        
    } else {
        // No image uploaded, set $imageData to NULL
        $imageData = NULL;
    }

    // Prepare and execute SQL query to insert menu item into the database with the category ID and image data
    $stmt = $conn->prepare("INSERT INTO menu (name, description, price, category_id, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdss", $itemName, $itemDescription, $itemPrice, $categoryId, $imageData);
    
    if ($stmt->execute()) {
        echo json_encode(array('success' => true, 'message' => 'Menu item added successfully!'));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Error: ' . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array('success' => false, 'error' => 'Invalid request method'));
}
?>
