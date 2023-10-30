document.addEventListener('DOMContentLoaded', function () {
    const foodButtonsContainer = document.getElementById('foodButtonsContainer');
    const menuItemsContainer = document.querySelector('.menu-items');

    generateFoodTypeButtons();

    const checkoutButton = document.getElementById('checkoutButton');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = '../checkout/checkout.html'; // Redirect to the checkout page
        });
    }

    if (foodButtonsContainer) {
        foodButtonsContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('food-type')) {
                const categoryId = target.getAttribute('data-category-id');

                // Fetch menu items based on the selected category
                fetchMenuItemsByCategory(categoryId)
                    .then(menuItems => {
                        displayMenuItems(menuItems);
                    })
                    .catch(error => {
                        console.error('Error fetching menu items:', error);
                    });

            }
        });
    }

    function fetchCategories() {
        return fetch('get_categories.php')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function fetchMenuItemsByCategory(categoryId) {
        return fetch(`get_menu_items_by_category.php?categoryId=${categoryId}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }

    function clearMenuItems() {
        const menuItemsContainer = document.querySelector('.menu-items');
        menuItemsContainer.innerHTML = '';
    }

    function displayMenuItems(menuItems) {
        clearMenuItems();

        foodButtonsContainer.style.display = 'none';
        menuItemsContainer.style.display = 'block';

        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return to categories';
        returnButton.className = 'return-button';

        returnButton.addEventListener('click', () => {
            menuItemsContainer.style.display = 'none';
            foodButtonsContainer.style.display = 'flex';
        });

        menuItemsContainer.appendChild(returnButton);

        if (menuItems.length === 0) {
            const noItemsMessage = document.createElement('p');
            noItemsMessage.textContent = 'No items available for this category.';
            menuItemsContainer.appendChild(noItemsMessage);
        } else {
            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';

                const imageElement = document.createElement('img');
                imageElement.src = 'data:image/png;base64,' + item.image;
                imageElement.className = 'menu-image';

                const detailsElement = document.createElement('div');
                detailsElement.className = 'menu-details';

                const nameElement = document.createElement('h2');
                nameElement.textContent = item.name;
                nameElement.className = 'menu-name';

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = item.description;
                descriptionElement.className = 'menu-description';

                const priceElement = document.createElement('p');
                priceElement.textContent = '$' + item.price;
                priceElement.className = 'menu-price';

                const quantityControls = document.createElement('div');
                quantityControls.className = 'quantity-controls';

                const minusBtn = document.createElement('button');
                minusBtn.textContent = '-';
                minusBtn.className = 'quantity-btn minus-btn';

                const quantityElement = document.createElement('span');
                quantityElement.textContent = '1';
                quantityElement.className = 'quantity';

                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';
                plusBtn.className = 'quantity-btn plus-btn';

                quantityControls.appendChild(minusBtn);
                quantityControls.appendChild(quantityElement);
                quantityControls.appendChild(plusBtn);

                const addToCartBtn = document.createElement('button');
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.className = 'add-to-cart-btn';

                detailsElement.appendChild(nameElement);
                detailsElement.appendChild(descriptionElement);
                detailsElement.appendChild(priceElement);
                detailsElement.appendChild(quantityControls);

                menuItem.appendChild(imageElement);
                menuItem.appendChild(detailsElement);
                menuItem.appendChild(addToCartBtn);

                menuItemsContainer.appendChild(menuItem);

                // Event listeners for plus and minus buttons
                minusBtn.addEventListener('click', () => {
                    let quantity = parseInt(quantityElement.textContent);
                    if (quantity > 1) {
                        quantity--;
                        quantityElement.textContent = quantity;
                    }
                });

                plusBtn.addEventListener('click', () => {
                    let quantity = parseInt(quantityElement.textContent);
                    quantity++;
                    quantityElement.textContent = quantity;
                });

                // Event listener for Add to Cart button
                addToCartBtn.addEventListener('click', () => {
                   // const itemId = menuItem.dataset.item.id;
                    //const itemName = menuItem.dataset.item.name;
                    //const itemPrice = parseFloat(menuItem.dataset.item.price);
                    const quantity = parseInt(quantityElement.textContent);
                    alert("Item added succesfully to cart");

                    // Call functions from checkout.js to handle the logic
                    addToCart(item.id, item.name, item.price, quantity);
                });
            });
        }
    }

    function generateFoodTypeButtons() {
        fetchCategories().then(data => {
            if (data) {
                data.forEach(item => {
                    const button = document.createElement('button');
                    button.className = 'food-type';

                    const img = document.createElement('img');
                    img.src = 'data:image/png;base64,' + item.image;
                    img.alt = item.name;

                    const p = document.createElement('p');
                    p.textContent = item.name;

                    button.setAttribute('data-category-id', item.id);

                    button.appendChild(img);
                    button.appendChild(p);

                    document.querySelector('.food-buttons').appendChild(button);
                });
            }
        });
    }
});