const Item = require('../models/itemModel');

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const items = await Item.find(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error: error.message });
    }
};

// Get item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving item', error: error.message });
    }
};

// Create new item
exports.createItem = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const item = await Item.create({
            name,
            price: parseFloat(price),
            description: description || '',
            category: category || 'Uncategorized'
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error: error.message });
    }
};

// Update item
exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

// Delete item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
};
