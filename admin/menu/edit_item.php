<?php
include('../../db.php'); // Include your database connection code

header('Content-Type: application/json'); // Set JSON content type header

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['itemId'])) {
    // Get form data
    $itemId = mysqli_real_escape_string($conn, $_POST['itemId']);
    $itemName = mysqli_real_escape_string($conn, $_POST['itemName']);
    $itemDescription = mysqli_real_escape_string($conn, $_POST['itemDescription']);
    $itemPrice = mysqli_real_escape_string($conn, $_POST['itemPrice']);

    // Check if a new image is uploaded
    if (isset($_FILES['itemImage']) && $_FILES['itemImage']['error'] === UPLOAD_ERR_OK) {
        // Handle uploaded image and encode it as base64
        $imageData = base64_encode(file_get_contents($_FILES['itemImage']['tmp_name']));
        
        // Update the item with the new image
        $stmt = $conn->prepare("UPDATE menu SET name=?, description=?, price=?, image=? WHERE id=?");
        $stmt->bind_param("ssdsi", $itemName, $itemDescription, $itemPrice, $imageData, $itemId);
    } else {
        // No new image uploaded, update the item without changing its image
        $stmt = $conn->prepare("UPDATE menu SET name=?, description=?, price=? WHERE id=?");
        $stmt->bind_param("ssdi", $itemName, $itemDescription, $itemPrice, $itemId);
    }

    $response = array(); // Initialize response array

    if ($stmt->execute()) {
        // Item successfully updated
        $response['success'] = true;
        $response['message'] = "Item updated successfully.";
    } else {
        // Error updating item
        $response['success'] = false;
        $response['message'] = "Error updating item.";
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
