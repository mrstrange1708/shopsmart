// In-memory storage for shop items
// This is a temporary solution until a database is connected
let items = [
    { id: '1', name: 'Laptop', price: 999.99, description: 'High-performance laptop', category: 'Electronics' },
    { id: '2', name: 'Coffee Maker', price: 49.99, description: 'Brews great coffee', category: 'Home' },
    { id: '3', name: 'Headphones', price: 199.99, description: 'Noise-cancelling headphones', category: 'Electronics' },
    { id: '4', name: 'Running Shoes', price: 89.99, description: 'Comfortable running shoes', category: 'Sports' },
    { id: '5', name: 'Desk Lamp', price: 29.99, description: 'Adjustable LED desk lamp', category: 'Office' }
];

module.exports = {
    // Get all items
    getAll: () => items,

    // Get item by ID
    getById: (id) => items.find(item => item.id === id),

    // Create new item
    create: (newItem) => {
        items.push(newItem);
        return newItem;
    },

    // Update item
    update: (id, updatedData) => {
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedData };
            return items[index];
        }
        return null;
    },

    // Delete item
    delete: (id) => {
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedItem = items[index];
            items.splice(index, 1);
            return deletedItem;
        }
        return null;
    }
};
