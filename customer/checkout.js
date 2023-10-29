// checkout.js

// Retrieve cart data from localStorage when the page loads
const savedCart = localStorage.getItem('cart');
let cart = savedCart ? JSON.parse(savedCart) : [];

// Function to add an item to the cart
function addToCart(itemId, itemName, itemPrice, quantity) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.itemId === itemId);

    if (existingItem) {
        // If the item is already in the cart, update the quantity
        existingItem.quantity += quantity;
    } else {
        // If the item is not in the cart, add it with the specified quantity
        cart.push({
            itemId: itemId,
            itemName: itemName,
            itemPrice: itemPrice,
            quantity: quantity
        });
    }

    // Save updated cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you can update the UI to show the cart contents or display a message
    console.log('Item added to cart:', cart);
}

document.addEventListener('DOMContentLoaded', function () {

    console.log(window.location.pathname);
    if (window.location.pathname === '/customer/checkout.html') {


        const cartItemsList = document.getElementById('cartItemsList');
        console.log(cart);
        // Function to display cart items
        // Function to display cart items
        function displayCartItems() {
            // Retrieve cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Clear the existing items in the cart
            cartItemsList.innerHTML = '';

            // Iterate through cart items and display them in the cart
            cartItems.forEach((item, index) => {
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
                minusButton.textContent = '-';
                minusButton.className = 'quantity-button';
                minusButton.addEventListener('click', () => {
                    // Decrease the quantity of the item and update the display
                    if (item.quantity > 1) {
                        item.quantity--;
                        localStorage.setItem('cart', JSON.stringify(cartItems));
                        displayCartItems();
                    }
                });
                const quantitySpan = document.createElement('span');
                quantitySpan.className = 'item-quantity';
                quantitySpan.textContent = item.quantity;
                const plusButton = document.createElement('button');
                plusButton.textContent = '+';
                plusButton.className = 'quantity-button';
                plusButton.addEventListener('click', () => {
                    // Increase the quantity of the item and update the display
                    item.quantity++;
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    displayCartItems();
                });
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-button';
                removeButton.addEventListener('click', () => {
                    // Remove the item from the cart and update the display
                    cartItems.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    displayCartItems();
                });
            
                quantityControlsDiv.appendChild(minusButton);
                quantityControlsDiv.appendChild(quantitySpan);
                quantityControlsDiv.appendChild(plusButton);
                quantityControlsDiv.appendChild(removeButton);
            
                cartItemDiv.appendChild(itemDetailsDiv);
                cartItemDiv.appendChild(quantityControlsDiv);
            
                cartItemsList.appendChild(cartItemDiv);
            });
            

            // Calculate total price and display it
            const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
            const totalElement = document.createElement('li');
            totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            cartItemsList.appendChild(totalElement);
        }


        // Call the displayCartItems function when the page loads
        displayCartItems();
    }
});

