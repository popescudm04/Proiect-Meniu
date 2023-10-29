<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="menu.css">
    <title>Restaurant Menu</title>
</head>

<body>
    <nav class="navbar">
        <div class="logo">Your Restaurant Name</div>
        <div class="nav-links">
            <a href="menu.php">Menu</a>
            <a href="orders.php">Orders</a> 
            
        </div>
    </nav>

    <!-- Add New Category Button -->
    <button id="showFormButton">Add New Category</button>

    <!-- Form to Add New Category -->
    <form id="categoryForm" enctype="multipart/form-data" style="display: none;">
        <label for="categoryName">Category Name:</label>
        <input type="text" id="categoryName" name="categoryName" required><br><br>

        <label for="categoryImage">Category Image (Optional):</label>
        <input type="file" id="categoryImage" name="categoryImage" accept="image/*"><br><br>

        <button type="submit">Add Category</button>
    </form>

    <!-- Add New Item Button -->
    <button id="showItemFormButton">Add New Item</button>

    <!-- Form to Add New Item -->
    <form id="itemForm" style="display: none;">
        <label for="itemName">Name:</label>
        <input type="text" id="itemName" name="itemName" required><br><br>

        <label for="itemDescription">Description:</label>
        <textarea id="itemDescription" name="itemDescription" required></textarea><br><br>

        <label for="itemPrice">Price:</label>
        <input type="number" id="itemPrice" name="itemPrice" step="0.01" required><br><br>

        <label for="itemCategory">Category:</label>
        <select id="itemCategory" name="categoryId" required></select><br><br>

        <label for="itemImage">Image (Optional):</label>
        <input type="file" id="itemImage" name="itemImage" accept="image/*"><br><br>

        <button type="submit">Add Item</button>
    </form>

    <div id="editModal" class="modal" style="display: none;">
        <!-- Modal content -->
        <div class="modal-content">
            <span id="closeEditModalBtn" class="close">&times;</span>
            <!-- Edit form inputs -->
            <input type="text" id="editItemName">
            <input type="text" id="editItemDescription">
            <input type="number" id="editItemPrice">
            <input type="hidden" id="editItemId">
            <input type="file" id="editItemImage" accept="image/*">
            <button id="editItemSubmitBtn">Save Changes</button>
        </div>
    </div>

    <div id="categoryList"></div>
    <div id="itemList"></div>

    <!-- Separate script.js file -->
    <script src="menu.js"></script>
</body>

</html>