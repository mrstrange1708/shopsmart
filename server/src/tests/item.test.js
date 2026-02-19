const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Item = require('../models/itemModel');

// Connect to a test database before running tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/shopsmart_test');
});

// Clear database before each test
beforeEach(async () => {
    await Item.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Shop Item API', () => {

    // Test GET /api/items (Empty)
    it('should return empty list when no items exist', async () => {
        const res = await request(app).get('/api/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    // Test POST /api/items (Create)
    it('should create a new item', async () => {
        const newItem = {
            name: 'Test Item',
            price: 10.99,
            description: 'Test Description',
            category: 'Test Category'
        };

        const res = await request(app).post('/api/items').send(newItem);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newItem.name);
        expect(res.body.price).toBe(newItem.price);
        expect(res.body.id).toBeDefined();
    });

    // Test GET /api/items (List with Items)
    it('should return list of items', async () => {
        const item = new Item({
            name: 'Item 1',
            price: 20,
            description: 'Desc 1',
            category: 'Cat 1'
        });
        await item.save();

        const res = await request(app).get('/api/items');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('Item 1');
    });

    // Test GET /api/items/:id (Read)
    it('should return item by ID', async () => {
        const item = new Item({
            name: 'Item 2',
            price: 30,
            description: 'Desc 2',
            category: 'Cat 2'
        });
        const savedItem = await item.save();

        const res = await request(app).get(`/api/items/${savedItem._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Item 2');
    });

    // Test PUT /api/items/:id (Update)
    it('should update an item', async () => {
        const item = new Item({
            name: 'Item 3',
            price: 40,
            description: 'Desc 3',
            category: 'Cat 3'
        });
        const savedItem = await item.save();

        const updatedData = {
            name: 'Updated Item 3',
            price: 45
        };

        const res = await request(app).put(`/api/items/${savedItem._id}`).send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Item 3');
        expect(res.body.price).toBe(45);
    });

    // Test DELETE /api/items/:id (Delete)
    it('should delete an item', async () => {
        const item = new Item({
            name: 'Item 4',
            price: 50,
            description: 'Desc 4',
            category: 'Cat 4'
        });
        const savedItem = await item.save();

        const res = await request(app).delete(`/api/items/${savedItem._id}`);
        expect(res.statusCode).toBe(204);

        const checkRes = await request(app).get(`/api/items/${savedItem._id}`);
        expect(checkRes.statusCode).toBe(404);
    });
});
