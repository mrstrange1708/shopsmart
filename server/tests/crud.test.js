const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); // Adjust path to app.js
const Item = require('../src/models/itemModel'); // Adjust path to itemModel.js

// Connect to a test database before running tests
beforeAll(async () => {
    await mongoose.connect(
        process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/shopsmart_test'
    );
});

// Clear database before each test
beforeEach(async () => {
    await Item.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Shop Smart API CRUD Operations', () => {
    // 1. Create (POST)
    describe('POST /api/items', () => {
        it('should create a new item successfully', async () => {
            const newItem = {
                name: 'Test Product',
                price: 99.99,
                description: 'A product for testing',
                category: 'Testing',
            };

            const res = await request(app).post('/api/items').send(newItem);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(newItem.name);
            expect(res.body.price).toBe(newItem.price);
            expect(res.body.id).toBeDefined();
        });

        it('should fail to create item without required fields', async () => {
            const res = await request(app).post('/api/items').send({ name: 'Incomplete' }); // Missing price, description, etc.

            expect(res.statusCode).toBe(400);
        });
    });

    // 2. Read All (GET)
    describe('GET /api/items', () => {
        it('should return all items', async () => {
            await Item.create([
                { name: 'Item 1', price: 10, description: 'Desc 1', category: 'Cat 1' },
                { name: 'Item 2', price: 20, description: 'Desc 2', category: 'Cat 2' },
            ]);

            const res = await request(app).get('/api/items');

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
        });

        it('should return empty list if no items', async () => {
            const res = await request(app).get('/api/items');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
        });
    });

    // 3. Read One (GET by ID)
    describe('GET /api/items/:id', () => {
        it('should return a specific item by ID', async () => {
            const item = await Item.create({
                name: 'Item 3',
                price: 30,
                description: 'Desc 3',
                category: 'Cat 3',
            });

            const res = await request(app).get(`/api/items/${item.id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('Item 3');
        });

        it('should return 404 for non-existent ID', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/api/items/${fakeId}`);

            expect(res.statusCode).toBe(404);
        });
    });

    // 4. Update (PUT)
    describe('PUT /api/items/:id', () => {
        it('should update an existing item', async () => {
            const item = await Item.create({
                name: 'Item 4',
                price: 40,
                description: 'Desc 4',
                category: 'Cat 4',
            });

            const res = await request(app)
                .put(`/api/items/${item.id}`)
                .send({ name: 'Updated Item 4', price: 45 });

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('Updated Item 4');
            expect(res.body.price).toBe(45);
        });
    });

    // 5. Delete (DELETE)
    describe('DELETE /api/items/:id', () => {
        it('should delete an item', async () => {
            const item = await Item.create({
                name: 'Item 5',
                price: 50,
                description: 'Desc 5',
                category: 'Cat 5',
            });

            const res = await request(app).delete(`/api/items/${item.id}`);

            expect(res.statusCode).toBe(204);

            const check = await Item.findById(item.id);
            expect(check).toBeNull();
        });
    });
});
