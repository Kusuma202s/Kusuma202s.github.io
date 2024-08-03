document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('signup-form');
    const toast = document.getElementById('toast');
    const apiUrl = ' https://jsonplaceholder.typicode.com/'; 

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !email || !password) {
            showToast('All fields are required.');
            return;
        }

        if (!validateEmail(email)) {
            showToast('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch(`${' https://jsonplaceholder.typicode.com/'}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                showToast('Form submitted successfully!', true);
                fetchUsers();
            } else {
                const errorData = await response.json();
                showToast(errorData.message || 'An error occurred.');
            }
        } catch (error) {
            showToast('An error occurred while submitting the form.');
        }
    });

    async function fetchUsers() {
        try {
            const response = await fetch(`${apiUrl}/users`);
            if (response.ok) {
                const users = await response.json();
                renderUsers(users);
            } else {
                showToast('Failed to retrieve users.');
            }
        } catch (error) {
            showToast('An error occurred while fetching users.');
        }
    }

    function renderUsers(users) {
        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; // Clear previous data

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.textContent = `${user.username} - ${user.email}`;
            userList.appendChild(userItem);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showToast(message, success = false) {
        toast.textContent = message;
        toast.className = success ? 'toast success' : 'toast error';
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    
    fetchUsers();
});

