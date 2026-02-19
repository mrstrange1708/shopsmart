const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./src/models/itemModel');

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopsmart');
        console.log('MongoDB Connected');

        const data = fs.readFileSync('items.csv', 'utf-8');
        const lines = data.split('\n');
        const headers = lines[0].split(',');

        const items = [];

        // Start from index 1 to skip headers
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; // Skip empty lines

            const currentLine = lines[i].split(',');
            const item = {};

            // Map CSV columns to object properties based on headers
            // Assuming simplified CSV without commas in values for this example
            item.name = currentLine[0]?.trim();
            item.price = parseFloat(currentLine[1]?.trim());
            item.description = currentLine[2]?.trim();
            item.category = currentLine[3]?.trim();

            if (item.name && item.price) {
                items.push(item);
            }
        }

        if (items.length > 0) {
            await Item.deleteMany(); // Optional: Clear existing data
            await Item.insertMany(items);
            console.log(`Successfully imported ${items.length} items`);
        } else {
            console.log('No items found to import');
        }

        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
