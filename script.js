document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-btn');
    const newItemInput = document.getElementById('new-item');
    const todoList = document.getElementById('todo-list');
    const searchInput = document.getElementById('search');
    const themePicker = document.getElementById('theme-picker');

    addButton.addEventListener('click', addItem);
    searchInput.addEventListener('input', searchItems);
    themePicker.addEventListener('input', changeTheme);

    function addItem() {
        const newItemText = newItemInput.value.trim();
        if (newItemText !== '') {
            const listItem = createListItem(newItemText);
            todoList.appendChild(listItem);
            newItemInput.value = '';
        }
    }

    function createListItem(text) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="item-text">${text}</span>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        const editButton = listItem.querySelector('.edit');
        const deleteButton = listItem.querySelector('.delete');
        const itemText = listItem.querySelector('.item-text');

        editButton.addEventListener('click', () => editItem(listItem, itemText));
        deleteButton.addEventListener('click', () => deleteItem(listItem));

        return listItem;
    }

    function editItem(listItem, itemText) {
        const currentText = itemText.textContent;
        const newTextInput = document.createElement('input');
        newTextInput.type = 'text';
        newTextInput.value = currentText;

        listItem.replaceChild(newTextInput, itemText);
        newTextInput.focus();

        newTextInput.addEventListener('blur', () => {
            itemText.textContent = newTextInput.value.trim() !== '' ? newTextInput.value.trim() : currentText;
            listItem.replaceChild(itemText, newTextInput);
        });
    }

    function deleteItem(listItem) {
        todoList.removeChild(listItem);
    }

    function searchItems() {
        const searchText = searchInput.value.toLowerCase();
        const items = todoList.querySelectorAll('li');

        items.forEach(item => {
            const itemText = item.querySelector('.item-text').textContent.toLowerCase();
            item.classList.toggle('hidden', !itemText.includes(searchText));
        });
    }

    function changeTheme() {
        const newColor = themePicker.value;
        document.documentElement.style.setProperty('--primary-color', newColor);
        document.documentElement.style.setProperty('--primary-color-hover', darkenColor(newColor, 0.2));
    }

    function darkenColor(color, amount) {
        let usePound = false;
        if (color[0] == "#") {
            color = color.slice(1);
            usePound = true;
        }
        const num = parseInt(color, 16);
        let r = (num >> 16) - amount * 255;
        let g = ((num >> 8) & 0x00FF) - amount * 255;
        let b = (num & 0x0000FF) - amount * 255;
        r = r < 0 ? 0 : r;
        g = g < 0 ? 0 : g;
        b = b < 0 ? 0 : b;
        return (usePound ? "#" : "") + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }
});
