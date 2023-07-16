import request from "supertest";
import app from '../../app/index.js';

describe('GET routes', () => {
    test('retrieves an item by name', async () => {
        const itemName = 'Jolt'
        const response = await request(app).get(`/api/items/${itemName}`);

        expect(response.status).toBe(200);
    });

    test('returns all items', async () => {
        const response = await request(app).get('/api/items');

        expect(response.status).toBe(200);
    })
})