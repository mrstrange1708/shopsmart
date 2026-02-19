const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

// Connect to a test database before running tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/shopsmart_test');
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Health Check', () => {
    describe('GET /api/health', () => {
        it('should return 200 and status ok', async () => {
            const res = await request(app).get('/api/health');
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('ok');
        });
    });
});
