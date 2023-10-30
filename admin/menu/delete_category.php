<?php
include('../../db.php'); // Include your database connection code

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET['id'])) {
    // Get category ID from the request parameter
    $categoryId = mysqli_real_escape_string($conn, $_GET['id']);

    // Delete menu items associated with the category
    $deleteMenuItemsQuery = "DELETE FROM menu WHERE category_id = '$categoryId'";

    if (mysqli_query($conn, $deleteMenuItemsQuery)) {
        // Menu items deleted successfully, now delete the category
        $deleteCategoryQuery = "DELETE FROM categories WHERE id = '$categoryId'";
        if (mysqli_query($conn, $deleteCategoryQuery)) {
            // Category deleted successfully
            header("HTTP/1.1 200 OK");
            echo "Category and associated menu items deleted successfully.";
        } else {
            // Error deleting category
            header("HTTP/1.1 500 Internal Server Error");
            echo "Error deleting category.";
        }
    } else {
        // Error deleting menu items
        header("HTTP/1.1 500 Internal Server Error");
        echo "Error deleting associated menu items.";
    }
} else {
    // Invalid request method or missing category ID parameter
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid request.";
}

// Close the database connection
$conn->close();
?>
