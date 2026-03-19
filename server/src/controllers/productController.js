const Product = require('../models/productModel');

// Get trending products
exports.getTrendingProducts = async (req, res) => {
    try {
        const products = await Product.find({ isTrending: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving trending products',
            error: error.message,
        });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { tag: { $regex: search, $options: 'i' } },
                ],
            };
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, oldPrice, image, tag, isTrending, rating } = req.body;

        if (!name || price == null || oldPrice == null || !image || !tag) {
            return res
                .status(400)
                .json({ message: 'name, price, oldPrice, image, and tag are required' });
        }

        const product = await Product.create({
            name,
            price: parseFloat(price),
            oldPrice: parseFloat(oldPrice),
            image,
            tag,
            isTrending: isTrending ?? false,
            rating: rating ?? 4.9,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
