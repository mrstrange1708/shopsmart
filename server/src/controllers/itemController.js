const Item = require('../models/itemModel');
const { v4: uuidv4 } = require('uuid');

// Get all items
exports.getAllItems = (req, res) => {
    try {
        const { search } = req.query;
        let items = Item.getAll();

        if (search) {
            const query = search.toLowerCase();
            items = items.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error: error.message });
    }
};

// Get item by ID
exports.getItemById = (req, res) => {
    try {
        const item = Item.getById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving item', error: error.message });
    }
};

// Create new item
exports.createItem = (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const newItem = {
            id: uuidv4(),
            name,
            price: parseFloat(price),
            description: description || '',
            category: category || 'Uncategorized'
        };

        const createdItem = Item.create(newItem);
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error: error.message });
    }
};

// Update item
exports.updateItem = (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const updatedItem = Item.update(req.params.id, { name, price, description, category });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

// Delete item
exports.deleteItem = (req, res) => {
    try {
        const deletedItem = Item.delete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
};
