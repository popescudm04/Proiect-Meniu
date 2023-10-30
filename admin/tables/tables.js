// Assuming you have an "Add New Table" button with an id 'addTableButton' in your HTML
const addTableButton = document.getElementById('addTableButton');

addTableButton.addEventListener('click', () => {
    const tableNumber = prompt('Enter the table number:');

    if (tableNumber !== null) { // Prompt was not canceled
        addNewTableToDatabase(tableNumber);
    }
});

function addNewTableToDatabase(tableNumber) {
    // Send an HTTP request to add the new table to the database
    const formData = new FormData();
    formData.append('tableNumber', tableNumber);

    fetch('add_table.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                // Table added successfully
                alert(`Table ${tableNumber} has been added.`);
                location.reload();
                // This might involve fetching the table data and appending a new table to the list.
            } else {
                alert('Error adding the table. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error adding the table:', error);
            alert('An error occurred. Please try again.');
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const tablesContainer = document.getElementById('tablesContainer');

    // Fetch tables from get_table.php
    fetch('get_tables.php')
        .then(response => response.json())
        .then(tables => {
            // Process the retrieved data and populate the tablesContainer
            tables.forEach(tableId => {
                const tableDiv = document.createElement('div');
                tableDiv.className = 'table-item';
                tableDiv.textContent = `Table ID: ${tableId}`;
                tableDiv.dataset.id = tableId; // Set the table ID as a data attribute

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-button';

                // Add event listener to remove the table when the button is clicked
                removeButton.addEventListener('click', () => {
                    const tableId = tableDiv.dataset.id; // Assuming you set the table ID as a data attribute
                    
                    // Send a DELETE request to remove the table
                    fetch(`remove_table.php?id=${tableId}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Table removed successfully, you might want to remove the tableDiv from the DOM
                            tableDiv.remove();
                        } else {
                            // Handle error case, display an error message or take appropriate action
                            console.error('Error removing table:', data.message);
                        }
                    })
                    .catch(error => {
                        // Handle network error, display an error message or take appropriate action
                        console.error('Network error:', error);
                    });
                });
                


                tableDiv.appendChild(removeButton);
                tablesContainer.appendChild(tableDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching tables:', error);
        });

});

