
        let groceryItems = [
            {
                id: 1,
                name: 'Milk',
                category: 'dairy',
                quantity: 2,
                amount: 120,
                expiry: '2024-12-30',
                status: 'active'
            },
            {
                id: 2,
                name: 'Bread',
                category: 'bakery',
                quantity: 1,
                amount: 40,
                expiry: '2024-12-29',
                status: 'active'
            },
            {
                id: 3,
                name: 'Apples',
                category: 'fruits',
                quantity: 5,
                amount: 200,
                expiry: '2025-01-02',
                status: 'active'
            }
        ];

        function calculateDaysLeft(expiry) {
            const today = new Date();
            const expiryDate = new Date(expiry);
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }

        function updateStats() {
            const activeItems = groceryItems.filter(item => item.status === 'active');
            const expiringItems = activeItems.filter(item => calculateDaysLeft(item.expiry) <= 3);
            const consumedItems = groceryItems.filter(item => item.status === 'consumed');
            const donatedItems = groceryItems.filter(item => item.status === 'donated');

            document.getElementById('activeCount').textContent = activeItems.length;
            document.getElementById('expiringCount').textContent = expiringItems.length;
            document.getElementById('consumedCount').textContent = consumedItems.length;
            document.getElementById('donatedCount').textContent = donatedItems.length;

            const totalAmount = activeItems.reduce((sum, item) => sum + item.amount, 0);
            document.getElementById('totalAmount').textContent = `₹${totalAmount}`;
        }

        function renderItems() {
            const itemsList = document.getElementById('itemsList');
            const emptyState = document.getElementById('emptyState');
            
            const activeItems = groceryItems.filter(item => item.status === 'active');
            
            if (activeItems.length === 0) {
                itemsList.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';
            
            itemsList.innerHTML = activeItems.map(item => {
                const daysLeft = calculateDaysLeft(item.expiry);
                const daysLeftText = daysLeft < 0 ? `${Math.abs(daysLeft)} days ago` : `${daysLeft} days`;
                const daysLeftClass = daysLeft <= 3 ? 'days-left' : '';
                
                return `
                    <div class="item-row">
                        <div class="item-name">
                            <div class="item-title">${item.name}</div>
                            <div class="item-category">${item.category}</div>
                        </div>
                        <div class="item-detail">
                            <strong>Quantity:</strong> ${item.quantity}
                        </div>
                        <div class="item-detail">
                            <strong>Amount:</strong> ₹${item.amount}
                        </div>
                        <div class="item-detail">
                            <strong>Expiry:</strong> ${item.expiry}<br>
                            <span class="${daysLeftClass}">Days left: ${daysLeftText}</span>
                        </div>
                        <div class="item-actions">
                            <button class="action-btn consumed-btn" onclick="updateItemStatus(${item.id}, 'consumed')">
                                ✅ Consumed
                            </button>
                            <button class="action-btn donate-btn" onclick="updateItemStatus(${item.id}, 'donated')">
                                💜 Donate
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteItem(${item.id})">
                                🗑️
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function updateItemStatus(id, status) {
            const item = groceryItems.find(item => item.id === id);
            if (item) {
                item.status = status;
                updateStats();
                renderItems();
            }
        }

        function deleteItem(id) {
            if (confirm('Are you sure you want to delete this item?')) {
                groceryItems = groceryItems.filter(item => item.id !== id);
                updateStats();
                renderItems();
            }
        }

        function openModal() {
            document.getElementById('modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
            document.body.style.overflow = 'auto';
            document.getElementById('groceryForm').reset();
        }

        // Close modal when clicking outside
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        document.getElementById('groceryForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newItem = {
                id: Date.now(),
                name: document.getElementById('itemName').value,
                category: document.getElementById('category').value,
                quantity: parseInt(document.getElementById('quantity').value),
                amount: parseFloat(document.getElementById('amount').value),
                expiry: document.getElementById('expiry').value,
                status: 'active'
            };

            groceryItems.push(newItem);
            updateStats();
            renderItems();
            closeModal();
        });

        // Initialize the app
        updateStats();
        renderItems();
