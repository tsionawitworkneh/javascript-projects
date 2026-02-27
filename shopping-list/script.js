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
        });


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

