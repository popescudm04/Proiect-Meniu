<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orders</title>
    <link rel="stylesheet" href="orders.css">
</head>

<body>
    <div class="navbar">
        <div class="logo">Restaurant Name</div>
        <div class="nav-links">
            <a href="menu.php">Menu</a>
            <a href="orders.php">Orders</a>
        </div>
    </div>

    <div class="container">
        <h1>Orders</h1>

        <!-- Table to display orders -->
        <table class="order-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Items</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Order rows will be dynamically populated here using JavaScript -->
            </tbody>
        </table>
    </div>

    <script src="orders.js"></script>
</body>

</html>
