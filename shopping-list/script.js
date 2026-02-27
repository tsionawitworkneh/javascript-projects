const addBtn = document.getElementById('add-btn');
const itemNameInput = document.getElementById('item-name');
const shoppingList = document.getElementById('shopping-list');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');

let items = JSON.parse(localStorage.getItem('myShoppingList')) || [];
let searchTerm = "";

function saveToStorage() {
    localStorage.setItem('myShoppingList', JSON.stringify(items));
}

const updateUI = () => {
    // Show/Hide empty state
    if (items.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Clear and redraw list
    shoppingList.innerHTML = '';
    
    items.forEach((item, index) => {
        if (!item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return; 
        }

        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <div class="item-info">
                <input type="checkbox" class="check" ${item.checked ? 'checked' : ''}>
                <span class="${item.checked ? 'completed' : ''}">${item.name}</span>
            </div>
            <button class="del-btn" style="background:none; border:none; color:red; cursor:pointer;">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;

        const checkBox = li.querySelector('.check');
        const textSpan = li.querySelector('span');

        checkBox.addEventListener('change', function() {
            if (this.checked) { 
                
                textSpan.classList.add('completed');
                items[index].checked = true; 
            } else {
                textSpan.classList.remove('completed');
                items[index].checked = false; 
            }

            saveToStorage();
        });


        shoppingList.appendChild(li);
    });
};

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value; // Update the search term
    updateUI(); // Re-draw the list
});

function addItem() {
    const nameValue = itemNameInput.value.trim();
    
    if (nameValue !== '') {
        // Create an object instead of just a string
        const newItem = {
            name: nameValue,
            checked: false
        };
        
        items.push(newItem);
        itemNameInput.value = ''; // Clear input box
        saveToStorage();
        updateUI();
    }
}

function deleteItem(index) {
    items.splice(index, 1);
    saveToStorage();
    updateUI();
}

addBtn.addEventListener('click', addItem);

itemNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

updateUI();

