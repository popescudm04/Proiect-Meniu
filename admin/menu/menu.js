document.addEventListener('DOMContentLoaded', function () {
    const categoryForm = document.getElementById('categoryForm');
    const showFormButton = document.getElementById('showFormButton');
    const itemForm = document.getElementById('itemForm');
    const showItemFormButton = document.getElementById('showItemFormButton');
    const itemCategorySelect = document.getElementById('itemCategory');
   // const categoryListDiv = document.getElementById('categoryList');



    // Fetch categories when the page loads
    fetchCategories();
    displayCategories();


    // Event listeners
    showItemFormButton.addEventListener('click', function () {
        // Show the form
        if (itemForm.style.display === 'none' || itemForm.style.display === '') {
            itemForm.style.display = 'block';
        } else {
            itemForm.style.display = 'none';
        }
    });

    itemForm.addEventListener('submit', handleItemFormSubmission);




    // Add event listener to the button to toggle the form's display property
    showFormButton.addEventListener('click', function () {
        if (categoryForm.style.display === 'none' || categoryForm.style.display === '') {
            categoryForm.style.display = 'block';
        } else {
            categoryForm.style.display = 'none';
        }
    });

    categoryForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const formData = new FormData(categoryForm); // Create a FormData object from the form

        // Send a POST request to add_category.php using Fetch API
        fetch('add_category.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    // Reset the form after successful submission
                    categoryForm.reset();
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Fetch categories from the server and populate the category dropdown
    function fetchCategories() {
        fetch('get_categories.php')
            .then(response => response.json())
            .then(categories => {
                // Process categories data (assuming each category object has 'id', 'name', and 'image' properties)
                const processedCategories = categories.map(category => {
                    return {
                        id: category.id,
                        name: category.name,
                        image: category.image // Assuming 'image' is the property name for the image data in your JSON response
                    };
                });

                populateCategoryDropdown(processedCategories);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    // Function to fetch and display items by category
    function fetchItemsByCategory(categoryId) {
        fetch(`get_items_by_category.php?category_id=${categoryId}`)
            .then(response => response.json())
            .then(items => {
                const itemListDiv = document.getElementById('itemList');
                itemListDiv.innerHTML = ''; // Clear the content before adding new items

                if (items.length === 0) {
                    const noItemsMessage = document.createElement('div');
                    noItemsMessage.className = 'item';
                    noItemsMessage.textContent = 'No items for this category currently.';
                    itemListDiv.appendChild(noItemsMessage);
                } else {
                    items.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'item';

                        // Create item image div
                        const itemImageDiv = document.createElement('div');
                        itemImageDiv.className = 'item-image';
                        itemDiv.appendChild(itemImageDiv);

                        // Display item image or text if no image exists
                        if (item.image) {
                            const itemImage = document.createElement('img');
                            itemImage.src = `data:image/png;base64,${item.image}`;
                            itemImage.alt = `${item.name} Image`;
                            itemImageDiv.appendChild(itemImage);
                        } else {
                            const noImageText = document.createElement('p');
                            noImageText.textContent = 'No image for this item';
                            itemImageDiv.appendChild(noImageText);
                        }

                        // Create item text div
                        const itemTextDiv = document.createElement('div');
                        itemTextDiv.className = 'item-text';
                        itemDiv.appendChild(itemTextDiv);

                        // Append item details to the item text div
                        const itemName = document.createElement('h3');
                        itemName.textContent = item.name;
                        itemTextDiv.appendChild(itemName);

                        const itemDescription = document.createElement('p');
                        itemDescription.textContent = item.description;
                        itemTextDiv.appendChild(itemDescription);

                        const itemPrice = document.createElement('p');
                        itemPrice.textContent = `Price: $${parseFloat(item.price).toFixed(2)}`;
                        itemTextDiv.appendChild(itemPrice);

                        // Create delete button
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.className = 'delete-button';

                        // Add click event listener to handle deletion
                        deleteButton.addEventListener('click', function () {
                            // Call a function to handle item deletion, passing item.id or any unique identifier
                            handleDeleteItem(item.id);
                        });

                        // Append delete button to the itemDiv
                        itemDiv.appendChild(deleteButton);

                        // Create an edit button
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
                        editButton.onclick = function () {
                            // Handle edit button click (open modal, populate form, etc.)
                            openEditModal(item);
                        };

                        // Append edit button to the itemDiv
                        itemDiv.appendChild(editButton);


                        itemListDiv.appendChild(itemDiv);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }




    




    function displayCategories() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'display_categories.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const categories = JSON.parse(xhr.responseText);
                        const categoryListDiv = document.getElementById('categoryList');
                        categoryListDiv.innerHTML = ''; // Clear the content before adding new categories

                        categories.forEach(category => {
                            const categoryDiv = document.createElement('div');
                            categoryDiv.className = 'category-item';
                            categoryDiv.dataset.id = category.id;

                            const categoryNameHeading = document.createElement('h2');
                            categoryNameHeading.textContent = category.name;
                            categoryDiv.appendChild(categoryNameHeading);

                            if (category.image) {
                                const categoryImage = new Image();
                                categoryImage.src = `data:image/png;base64,${category.image}`; // Assuming category.image contains base64-encoded image data
                                categoryImage.alt = `${category.name} Image`;
                                categoryDiv.appendChild(categoryImage);
                            } else {
                                const noImageText = document.createElement('p');
                                noImageText.textContent = 'No image for this category';
                                categoryDiv.appendChild(noImageText);
                            }

                            // Create delete button
                            const deleteButton = document.createElement('button');
                            deleteButton.textContent = 'Delete';
                            deleteButton.className = 'delete-button';
                            deleteButton.addEventListener('click', (event) => {
                                event.stopPropagation(); // Prevent category click event from firing
                                
                                // Show a confirmation dialog
                                const confirmDelete = confirm(`Are you sure you want to delete the category "${category.name}"? 
                                Deleting the category will also delete all menu items from this category.`);
                                
                                if (confirmDelete) {
                                    // User confirmed, make a DELETE request to your delete_category.php endpoint
                                    const categoryId = category.id; // Assuming you have the category ID available
                                    fetch(`delete_category.php?id=${categoryId}`, {
                                        method: 'DELETE'
                                    })
                                    .then(response => {
                                        if (response.ok) {
                                            console.log(`Category with ID ${categoryId} deleted successfully.`);
                                            // Optionally, update your UI to reflect the deletion
                                        } else {
                                            console.error('Error deleting category:', response.statusText);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error deleting category:', error);
                                    });
                                } else {
                                    // User canceled the deletion
                                    console.log('Deletion canceled');
                                }
                            });
                            categoryDiv.appendChild(deleteButton);

                            categoryListDiv.appendChild(categoryDiv);

                            // Add a flag to keep track of item visibility
                            categoryDiv.showItems = false;

                            // Toggle items when the category is clicked
                            categoryDiv.addEventListener('click', () => {
                                const categoryId = categoryDiv.dataset.id;
                                if (categoryDiv.showItems) {
                                    hideItems();
                                } else {
                                    hideItems();
                                    fetchItemsByCategory(categoryId);
                                }
                                categoryDiv.showItems = !categoryDiv.showItems;
                            });
                        });

                        console.log('Categories displayed successfully.');
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                } else {
                    console.error('Request failed with status:', xhr.status);
                }
            }
        };
        xhr.send();
    }









    // Function to hide items
    function hideItems() {
        const itemListDiv = document.getElementById('itemList');
        itemListDiv.innerHTML = '';
    }



    // Populate the category dropdown with fetched categories
    function populateCategoryDropdown(categories) {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            itemCategorySelect.appendChild(option);
        });
    }


    // Handle item form submission
    function handleItemFormSubmission(event) {
        event.preventDefault();

        const formData = new FormData(itemForm);

        fetch('add_item.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                if (data.success) {
                    alert(data.message);

                    // Hide the form after submission
                    itemForm.style.display = 'none';

                    // Reset form fields with a delay (in milliseconds)
                    setTimeout(function () {
                        itemForm.reset();
                    }, 100);
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    function handleDeleteItem(itemId) {
        // Make a DELETE request to the server-side endpoint (replace 'delete_item.php' with your actual endpoint)
        fetch(`delete_item.php?id=${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Adjust the content type if necessary
            },
        })
            .then(response => {
                if (response.ok) {
                    // Item successfully deleted
                    console.log('Item deleted successfully.');
                    // You can update the UI, remove the item from the DOM, or refresh the item list here.
                    location.reload();

                } else {
                    // Error handling for unsuccessful deletion
                    console.error('Error deleting item.');
                }
            })
            .catch(error => {
                // Network error or other fetch-related issues
                console.error('Error:', error);
            });
    }
    function openEditModal(item) {
        // Get references to modal elements
        const editModal = document.getElementById('editModal');
        const itemNameInput = document.getElementById('editItemName');
        const itemDescriptionInput = document.getElementById('editItemDescription');
        const itemPriceInput = document.getElementById('editItemPrice');
        const itemIdInput = document.getElementById('editItemId');
        const itemImageInput = document.getElementById('editItemImage'); // New image input field

        // Populate form fields with item details
        itemNameInput.value = item.name;
        itemDescriptionInput.value = item.description;
        itemPriceInput.value = item.price;
        itemIdInput.value = item.id; // Store item ID for updating the item

        // Handle image input change
        itemImageInput.addEventListener('change', function () {
            // You can handle the selected image here if needed
        });

        // Show the edit modal
        editModal.style.display = 'block';

        // Handle modal close (optional)
        const closeBtn = document.getElementById('closeEditModalBtn');
        closeBtn.addEventListener('click', function () {
            editModal.style.display = 'none';
        });
    }


    document.getElementById('editItemSubmitBtn').addEventListener('click', function () {
        // Get edited item details from the form fields
        const itemId = document.getElementById('editItemId').value;
        const itemName = document.getElementById('editItemName').value;
        const itemDescription = document.getElementById('editItemDescription').value;
        const itemPrice = document.getElementById('editItemPrice').value;
        const itemImage = document.getElementById('editItemImage').files[0]; // Get selected image file

        // Create a FormData object to send data via AJAX
        const formData = new FormData();
        formData.append('itemId', itemId);
        formData.append('itemName', itemName);
        formData.append('itemDescription', itemDescription);
        formData.append('itemPrice', itemPrice);
        if (itemImage) {
            formData.append('itemImage', itemImage);
        }

        // Send an AJAX request to edit_item.php to update the item
        fetch('edit_item.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Log the server response for debugging
                console.log(data); // Add this line to see the response from the server

                // Handle the response data (success or error)
                if (data.success) {
                    // Handle success (e.g., show a success message to the user)
                    console.log(data.message);

                    // Close the edit modal after successful edit
                    const editModal = document.getElementById('editModal');
                    editModal.style.display = 'none';
                    location.reload();
                } else {
                    // Handle error (e.g., show an error message to the user)
                    console.error(data.error);
                }
            })
            .catch(error => {
                // Handle fetch error
                console.error('Error:', error);
            });


    });








});





