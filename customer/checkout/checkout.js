// checkout.js


// Retrieve cart data from localStorage when the page loads
const savedCart = localStorage.getItem('cart');
let cart = savedCart ? JSON.parse(savedCart) : [];

// Function to add an item to the cart
function addToCart(tableId, itemId, itemName, itemPrice, quantity) {
    // Check if the item is already in the cart for the specified table_id
    const existingItem = cart.find(item => item.tableId === tableId && item.itemId === itemId);

    if (existingItem) {
        // If the item is already in the cart, update the quantity
        existingItem.quantity += quantity;
    } else {
        // If the item is not in the cart, add it with the specified quantity and table_id
        cart.push({
            tableId: tableId,
            itemId: itemId,
            itemName: itemName,
            itemPrice: itemPrice,
            quantity: quantity
        });
    }

    // Save updated cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you can update the UI to show the cart contents or display a message
    console.log('Item added to cart for table ID:', tableId, cart);
}

// Function to place an order
function placeOrder(tableId, items) {
    const orderData = {
        table_id: tableId,
        items: items
    };

    // Send the order data to the server using fetch API
    fetch(`place_order.php?table_id=${tableId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server (if needed)
            console.log('Order placed successfully:', data);
            // Optionally, you can redirect the user to a confirmation page or perform other actions
        })
        .catch(error => {
            console.error('Error placing order:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {

    console.log(window.location.pathname);
    if (window.location.pathname === '/customer/checkout/checkout.html') {

        // Function to extract table ID from URL
        function getTableIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            const tableId = urlParams.get('table_id');
            return tableId;
        }

        // Example usage
        const tableId = getTableIdFromUrl();
        console.log('Table ID from URL:', tableId);


        const cartItemsList = document.getElementById('cartItemsList');
        console.log(cart);
        // Function to display cart items
        // Function to display cart items
        function displayCartItems(tableId) {
            // Retrieve cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Filter cart items based on the specified tableId
            const filteredCartItems = cartItems.filter(item => item.tableId === tableId);

            // Clear the existing items in the cart
            cartItemsList.innerHTML = '';

            // Iterate through cart items and display them in the cart
            filteredCartItems.forEach((item, index) => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';

                const itemDetailsDiv = document.createElement('div');
                itemDetailsDiv.className = 'item-details';
                const itemName = document.createElement('p');
                itemName.className = 'item-name';
                itemName.textContent = item.itemName;
                const itemPrice = document.createElement('p');
                itemPrice.className = 'item-price';
                itemPrice.textContent = `$${parseFloat(item.itemPrice).toFixed(2)}`;
                itemDetailsDiv.appendChild(itemName);
                itemDetailsDiv.appendChild(itemPrice);

                const quantityControlsDiv = document.createElement('div');
                quantityControlsDiv.className = 'quantity-controls';
                const minusButton = document.createElement('button');
                const minusIcon = document.createElement('span');
                minusIcon.className ='material-symbols-outlined';
                minusIcon.textContent = 'remove';
                minusButton.textContent = '';
                minusButton.className = 'quantity-button';

                minusButton.appendChild(minusIcon);

                minusButton.addEventListener('click', () => {
                    // Decrease the quantity of the item and update the display
                    if (item.quantity > 1) {
                        item.quantity--;
                        localStorage.setItem('cart', JSON.stringify(cartItems));
                        displayCartItems(tableId);
                    }
                });
                const quantitySpan = document.createElement('div');
                quantitySpan.className = 'item-quantity';
                quantitySpan.textContent = item.quantity;
                
                const plusButton = document.createElement('button');
                const plusIcon = document.createElement('span');
                plusButton.textContent = '';
                plusButton.className = 'quantity-button';
                plusIcon.className = 'material-symbols-outlined'
                plusIcon.textContent ='add';
                plusButton.appendChild(plusIcon);

                plusButton.addEventListener('click', () => {
                    // Increase the quantity of the item and update the display
                    item.quantity++;
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    displayCartItems(tableId);
                });
                const removeButton = document.createElement('button');
                const removeIcon = document.createElement('span');
                removeIcon.className = 'material-symbols-outlined';
                removeIcon.textContent = 'delete';
                removeButton.textContent = '';
                removeButton.className = 'remove-button';
                removeButton.appendChild(removeIcon);
                removeButton.addEventListener('click', () => {
                    // Find the index of the item with the matching tableId and itemId
                    const itemIndex = cart.findIndex(item => item.tableId === tableId && item.itemId === item.itemId);

                    if (itemIndex !== -1) {
                        // Remove the item from the cart if found
                        cart.splice(itemIndex, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        displayCartItems(tableId);
                    }
                });


                // Append buttons to quantityControlsDiv
                quantityControlsDiv.appendChild(minusButton);
                quantityControlsDiv.appendChild(quantitySpan);
                quantityControlsDiv.appendChild(plusButton);
                quantityControlsDiv.appendChild(removeButton);

                cartItemDiv.appendChild(itemDetailsDiv);
                cartItemDiv.appendChild(quantityControlsDiv);

                cartItemsList.appendChild(cartItemDiv);
            });


            // Calculate total price and display it
            const totalPrice = filteredCartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
            const totalElement = document.createElement('li');
            totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            cartItemsList.appendChild(totalElement);
        }


        // Call the displayCartItems function when the page loads
        displayCartItems(tableId);

        // Event listener for the "Place Order" button click
        const placeOrderButton = document.getElementById('placeOrderButton');
        placeOrderButton.addEventListener('click', () => {
            // Retrieve cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Filter cart items based on the specified tableId
            const filteredCartItems = cartItems.filter(item => item.tableId === tableId);

            // Place the order
            placeOrder(tableId, filteredCartItems);
        });




    }
});

