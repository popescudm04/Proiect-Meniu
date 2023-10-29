<?php
include('../db.php'); // Include the database connection file

if (isset($_GET['categoryId'])) {
    // Sanitize the category ID
    $categoryId = mysqli_real_escape_string($conn, $_GET['categoryId']);
    
    // Fetch menu items with the specified category ID using prepared statements
    $sql = "SELECT * FROM menu WHERE category_id = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('i', $categoryId); // 'i' indicates an integer parameter
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        $menuItems = [];
        
        while ($row = $result->fetch_assoc()) {
            $menuItems[] = $row;
        }
        
        // Return menu items as JSON
        header('Content-Type: application/json');
        echo json_encode($menuItems);
        
        $stmt->close();
    } else {
        // Handle database error
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error"]);
    }
} else {
    // Handle the case where the categoryId is not provided
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Category ID not provided in the request"]);
}

// Close the database connection
$conn->close();
?>
