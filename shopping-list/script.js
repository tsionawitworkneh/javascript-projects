const addBtn = document.getElementById('add-btn');
const itemNameInput = document.getElementById('item-name');
const shoppingList = document.getElementById('shopping-list');
const emptyState = document.getElementById('empty-state');

let items = [];

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
            
            <span>${item}</span>
            <button onclick="deleteItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;
        shoppingList.appendChild(li);
    });
};

function addItem() {
    const name = itemNameInput.value.trim();
    if (name !== '') {
        items.push(name);
        itemNameInput.value = ''; // Clear input box
        updateUI();
    }
}

function deleteItem(index) {
    items.splice(index, 1);
    updateUI();
}

addBtn.addEventListener('click', addItem);

itemNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});