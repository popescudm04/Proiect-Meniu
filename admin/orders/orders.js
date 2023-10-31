document.addEventListener('DOMContentLoaded', function () {
    const ordersContainer = document.querySelector('.orders-container');

    // Fetch orders data from your server-side script (get_orders.php)
    fetch('get_orders.php')
        .then(response => response.json())
        .then(orders => {
            // Process the retrieved data and populate the ordersContainer
            // Assuming 'orders' is the array of objects retrieved from the server
            orders.forEach(order => {
                const orderData = JSON.parse(order.order_column);

                const orderDiv = document.createElement('div');
                orderDiv.className = 'order-item';

                const tableIdElement = document.createElement('p');
                tableIdElement.className = 'table-id';
                tableIdElement.textContent = `Table ID: ${order.table_id}`;

                const itemsList = document.createElement('ul');
                itemsList.className = 'items-list';

                if (Array.isArray(orderData.items) && orderData.items.length > 0) {
                    // Process items if the order is not empty
                    orderData.items.forEach(item => {
                        const itemElement = document.createElement('li');
                        itemElement.textContent = `${item.itemName} - Quantity: ${item.quantity} - Price: $${(item.itemPrice * item.quantity).toFixed(2)}`;
                        itemsList.appendChild(itemElement);
                    });

                    // Calculate and display total price
                    let totalPrice = orderData.items.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
                    const totalElement = document.createElement('li');
                    totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
                    itemsList.appendChild(totalElement);
                } else {
                    // If the order is empty, display a message
                    const emptyOrderElement = document.createElement('li');
                    emptyOrderElement.textContent = 'No items in this order.';
                    itemsList.appendChild(emptyOrderElement);
                }

                orderDiv.appendChild(tableIdElement);
                orderDiv.appendChild(itemsList);

                ordersContainer.appendChild(orderDiv);
            });


        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });

});
