const addBtn = document.getElementById('add-btn');
const itemNameInput = document.getElementById('item-name');
const shoppingList = document.getElementById('shopping-list');
const emptyState = document.getElementById('empty-state');




let items = JSON.parse(localStorage.getItem('myShoppingList')) || [];


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
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <div class="item-info">
                <input type="checkbox" class="check" ${item.checked ? 'checked' : ''}>
                <span class="${item.checked ? 'completed' : ''}">${item.name}</span>
            </div>
            <button onclick="deleteItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">
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

function searchItems() {
    // 1. Get the search input and the filter text
    const input = document.getElementById('search');
    const filter = input.value.toUpperCase();
    
    // 2. Get the list and all the <li> items
    const ul = document.getElementById("shopping-list");
    const li = ul.getElementsByTagName('li');

    // 3. Loop through all list items
    for (let i = 0; i < li.length; i++) {
        // Find the span that contains the item name
        const span = li[i].querySelector("span");
        if (span) {
            const txtValue = span.textContent || span.innerText;
            
            // 4. If the text matches, show it. Otherwise, hide it.
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
}

// Attach it to the search bar
document.getElementById('search').addEventListener('keyup', searchItems);

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

