<?php
include('../../db.php'); // Include your database connection code

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET['id'])) {
    // Get the item ID from the query parameter
    $itemId = mysqli_real_escape_string($conn, $_GET['id']);

    // Prepare and execute SQL query to delete the menu item from the database
    $stmt = $conn->prepare("DELETE FROM menu WHERE id = ?");
    $stmt->bind_param("s", $itemId);

    if ($stmt->execute()) {
        // Item successfully deleted
        header("HTTP/1.1 200 OK");
        echo "Item deleted successfully.";
    } else {
        // Error deleting item
        header("HTTP/1.1 500 Internal Server Error");
        echo "Error deleting item.";
    }

    $stmt->close();
    $conn->close();
} else {
    // Invalid request method or missing item ID parameter
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid request.";
}
?>
